require('dotenv').config();
console.log("🔍 DEBUG - Variáveis de Ambiente:");
console.log("PIPEFY_TOKEN:", process.env.PIPEFY_TOKEN ? "✅ PRÉSENTE" : "❌ AUSENTE");
console.log("PIPEFY_PIPE_ID:", process.env.PIPEFY_PIPE_ID || "❌ AUSENTE");
console.log("======================================");

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const Docxtemplater = require('docxtemplater');
const PizZip = require('pizzip');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(path.join(__dirname, '../frontend')));

// Criar pastas se não existirem
const tempDir = path.join(__dirname, '../temp');
const templatesDir = path.join(__dirname, '../templates');

[tempDir, templatesDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

const MAPEAMENTO_PIPEFY = require('./mapeamento-pipefy.js');

// ROTA PARA VERIFICAR STATUS DO PIPEFY
app.get('/api/pipefy-status', async (req, res) => {
    try {
        if (!process.env.PIPEFY_TOKEN || !process.env.PIPEFY_PIPE_ID) {
            return res.json({ configurado: false });
        }

        const response = await fetch('https://api.pipefy.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.PIPEFY_TOKEN}`
            },
            body: JSON.stringify({
                query: `{ pipe(id: "${process.env.PIPEFY_PIPE_ID}") { id name } }`
            })
        });

        const result = await response.json();
        const estaConfigurado = !result.errors && result.data && result.data.pipe;
        
        res.json({
            configurado: estaConfigurado,
            pipe: result.data?.pipe || null
        });

    } catch (error) {
        res.json({ configurado: false });
    }
});

// ROTA PARA LISTAR CARDS ATIVOS DO PIPEFY
app.get('/api/active-clients', async (req, res) => {
    try {
        const response = await fetch('https://api.pipefy.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.PIPEFY_TOKEN}`
            },
            body: JSON.stringify({
                query: `{
                    pipe(id: "${process.env.PIPEFY_PIPE_ID}") {
                        phases {
                            cards {
                                edges {
                                    node {
                                        id
                                        title
                                    }
                                }
                            }
                        }
                    }
                }`
            })
        });

        const result = await response.json();
        
        if (result.errors) {
            throw new Error(result.errors[0].message);
        }

        const cards = [];
        result.data.pipe.phases.forEach(phase => {
            phase.cards.edges.forEach(edge => {
                cards.push({
                    id: edge.node.id,
                    title: edge.node.title
                });
            });
        });

        res.json({
            success: true,
            cards: cards,
            total: cards.length
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// FUNÇÃO PARA MAPEAR DADOS DO PIPEFY
function mapearDadosPipefy(cardData) {
    const dadosMapeados = {};
    
    if (!cardData.fields) {
        return dadosMapeados;
    }

    cardData.fields.forEach(field => {
        const perguntaPipefy = field.name || field.field?.label || '';
        const respostaPipefy = field.value || field.values?.[0] || '';
        
        const variavelSistema = MAPEAMENTO_PIPEFY[perguntaPipefy];
        
        if (variavelSistema && respostaPipefy) {
            dadosMapeados[variavelSistema] = respostaPipefy;
        }
    });

    return dadosMapeados;
}

// FUNÇÃO PARA BUSCAR CARD NO PIPEFY
async function buscarCardPipefy(cardId) {
    const response = await fetch('https://api.pipefy.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.PIPEFY_TOKEN}`
        },
        body: JSON.stringify({
            query: `
                query GetCard($id: ID!) {
                    card(id: $id) {
                        id
                        title
                        fields {
                            name
                            value
                        }
                    }
                }
            `,
            variables: { id: cardId }
        })
    });
    
    const result = await response.json();
    
    if (result.errors) {
        throw new Error(result.errors[0].message);
    }
    
    return result.data.card;
}

// ROTA PARA BUSCAR E MAPEAR CARD
app.post('/api/mapear-card-pipefy', async (req, res) => {
    try {
        const { cardId } = req.body;
        
        const cardData = await buscarCardPipefy(cardId);
        const dadosPreenchidos = mapearDadosPipefy(cardData);
        
        res.json({
            success: true,
            card: {
                id: cardData.id,
                title: cardData.title
            },
            dadosPreenchidos: dadosPreenchidos,
            totalCampos: Object.keys(dadosPreenchidos).length
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// VERSÃO SIMPLES - SE NÃO TEM DADO, FICA VAZIO
    function gerarDocumento(templateName, dados, res, filename) {
        return new Promise((resolve, reject) => {
        try {
            const templatePath = path.join(templatesDir, templateName);
            if (!fs.existsSync(templatePath)) {
                throw new Error(`Template não encontrado: ${templatePath}`);
            }

            const content = fs.readFileSync(templatePath, 'binary');
            const zip = new PizZip(content);

            const doc = new Docxtemplater(zip, {
                paragraphLoop: true,
                linebreaks: true,
                // ISSO AQUI É A SOLUÇÃO - faz variáveis não encontradas ficarem vazias
                nullGetter: function() {
                    return "";
                }
            });

            doc.render(dados);

            const buffer = doc.getZip().generate({
                type: 'nodebuffer',
                compression: 'DEFLATE'
            });

            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
            res.setHeader('Content-Length', buffer.length);

            res.send(buffer);
            resolve();

        } catch (error) {
            console.error('❌ Erro ao gerar documento:', error);
            reject(error);
        }
    });

}

// ROTAS DE DOCUMENTOS
app.post('/api/gerar-documento/cadastro-imovel', async (req, res) => {
    try {
        await gerarDocumento('Ficha_de_captacao.docx', req.body, res, 'Ficha_Captacao_Imovel.docx');
    } catch (error) {
        res.status(500).json({ error: 'Erro ao gerar cadastro de imóvel' });
    }
});

app.post('/api/gerar-documento/contrato-locacao', async (req, res) => {
    try {
        await gerarDocumento('contrato.docx', req.body, res, 'Contrato_Locacao.docx');
    } catch (error) {
        res.status(500).json({ error: 'Erro ao gerar contrato de locação' });
    }
});

app.post('/api/gerar-documento/contrato-administracao', async (req, res) => {
    try {
        await gerarDocumento('contrato_administracao.docx', req.body, res, 'Contrato_Administracao.docx');
    } catch (error) {
        res.status(500).json({ error: 'Erro ao gerar contrato de administração' });
    }
});

app.post('/api/gerar-documento/ficha-cadastral', async (req, res) => {
    try {
        await gerarDocumento('fichaCadastral.docx', req.body, res, 'Ficha_Cadastral.docx');
    } catch (error) {
        res.status(500).json({ error: 'Erro ao gerar ficha cadastral' });
    }
});

app.post('/api/gerar-documento/recibo-aluguel', async (req, res) => {
    try {
        await gerarDocumento('recibo.docx', req.body, res, 'Recibo_Aluguel.docx');
    } catch (error) {
        res.status(500).json({ error: 'Erro ao gerar recibo de aluguel' });
    }
});

app.post('/api/gerar-documento/termo-vistoria', async (req, res) => {
    try {
        await gerarDocumento('vistoria_corrigido_dinamico.docx', req.body, res, 'Termo_Vistoria.docx');
    } catch (error) {
        res.status(500).json({ error: 'Erro ao gerar termo de vistoria' });
    }
});

app.post('/api/gerar-documento/gestaodecondominio', async (req, res) => {
    try {
        await gerarDocumento('condominios.docx', req.body, res, 'Relatorio_Condominio.docx');
    } catch (error) {
        console.error('❌ Erro ao gerar relatório de condomínio:', error);
        res.status(500).json({ error: 'Erro ao gerar relatório de condomínio' });
    }
});

// HEALTH CHECK
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Sistema Villares funcionando!',
        timestamp: new Date().toISOString()
    });
});

// ROTA PARA VERIFICAR TEMPLATES
app.get('/api/verificar-templates', (req, res) => {
    const templates = {
        'Ficha_de_captacao.docx': fs.existsSync(path.join(templatesDir, 'Ficha_de_captacao.docx')),
        'contrato.docx': fs.existsSync(path.join(templatesDir, 'contrato.docx')),
        'contrato_administracao.docx': fs.existsSync(path.join(templatesDir, 'contrato_administracao.docx')),
        'fichaCadastral.docx': fs.existsSync(path.join(templatesDir, 'fichaCadastral.docx')),
        'recibo.docx': fs.existsSync(path.join(templatesDir, 'recibo.docx')),
        'vistoria_corrigido_dinamico.docx': fs.existsSync(path.join(templatesDir, 'vistoria_corrigido_dinamico.docx')),
        'condominios.docx': fs.existsSync(path.join(templatesDir, 'condominios.docx'))
    };
    
    res.json({ templates: templates });
});

// FRONTEND
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});



// INICIAR SERVIDOR
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('='.repeat(60));
    console.log('🚀 SISTEMA VILLARES - SERVIDOR INICIADO');
    console.log(`🔗 Porta: ${PORT}`);
    console.log(`🌐 Access: http://localhost:${PORT}`);
    console.log('='.repeat(60));
});
