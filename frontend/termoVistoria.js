//==========================================================
// TERMO DE VISTORIA - CÓDIGO CORRIGIDO
//==========================================================

let fiadoresVistoriaCount = 1;
let comodosCount = 0;

async function loadTermoVistoriaPage() {
    console.log('Carregando página de termo de vistoria...');

    const content = document.getElementById('page-content');
    if (!content) {
        console.error('Elemento page-content não encontrado!');
        return;
    }

    content.innerHTML = `
        <div class="page-container">
            <div class="page-header">
                <button class="btn btn-secondary" onclick="goBack()">← VOLTAR</button>
                <h1>🔍 TERMO DE VISTORIA</h1>
                <div id="pipefy-selector"></div>
            </div>

            <div class="main-container">
                <div id="loading" class="alert alert-info">Carregando dados do Pipefy...</div>

                <form id="termo-vistoria-form">
                    <!-- Dados do Locatário -->
                    <div class="section-header">
                        <h3>DADOS DO LOCATÁRIO</h3>
                    </div>

                    <div class="row">
                        <div class="col-4">
                            <div class="form-group">
                                <label>Nome do Locatário</label>
                                <input type="text" id="nomeLocatario" class="form-control" placeholder="Nome completo">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>RG</label>
                                <input type="text" id="RGLocatario" class="form-control" placeholder="00.000.000-0">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>CPF do Locatário</label>
                                <input type="text" id="CPFLocatario" class="form-control" placeholder="000.000.000-00">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>Endereço do Locatário</label>
                                <input type="text" id="enderecoLocatario" class="form-control" placeholder="Rua, número, bairro">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>Celular</label>
                                <input type="text" id="celular" class="form-control" placeholder="(00) 00000-0000">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>E-mail</label>
                                <input type="email" id="email" class="form-control" placeholder="email@exemplo.com">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>Endereço do imóvel</label>
                                <input type="text" id="enderecoImovel" class="form-control" placeholder="Endereço completo do imóvel">
                            </div>
                        </div>
                    </div>

                    <!-- Datas -->
                    <div class="section-header">
                        <h3>DATAS</h3>
                    </div>

                    <div class="row">
                        <div class="col-4">
                            <div class="form-group">
                                <label>Data do Contrato</label>
                                <input type="text" id="dataContrato" class="form-control" placeholder="DD/MM/AAAA" value="${new Date().toLocaleDateString('pt-BR')}">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Data da Vistoria</label>
                                <input type="text" id="dataVistoria" class="form-control" placeholder="DD/MM/AAAA" value="${new Date().toLocaleDateString('pt-BR')}">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Nome do Vistoriador</label>
                                <input type="text" id="nomeVistoriador" class="form-control" placeholder="Nome do vistoriador">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-4">
                            <div class="form-group">
                                <label>Dia do Contrato</label>
                                <input type="text" id="dia" class="form-control" placeholder="DD" value="${new Date().getDate()}">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Mês do Contrato</label>
                                <input type="text" id="mes" class="form-control" placeholder="ex: setembro" value="${new Date().toLocaleDateString('pt-BR', { month: 'long' })}">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Ano do Contrato</label>
                                <input type="text" id="ano" class="form-control" placeholder="AAAA" value="${new Date().getFullYear()}">
                            </div>
                        </div>
                    </div>

                    <!-- Testemunhas -->
                    <div class="section-header">
                        <h3>TESTEMUNHAS</h3>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>Testemunha 1</label>
                                <input type="text" id="nomeTestemunha1" class="form-control" placeholder="Nome completo">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>CPF Testemunha 1</label>
                                <input type="text" id="CPFTestemunha1" class="form-control" placeholder="000.000.000-00">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>Testemunha 2</label>
                                <input type="text" id="nomeTestemunha2" class="form-control" placeholder="Nome completo">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>CPF Testemunha 2</label>
                                <input type="text" id="CPFTestemunha2" class="form-control" placeholder="000.000.000-00">
                            </div>
                        </div>
                    </div>

                    <!-- Fiadores -->  
                    <div class="section-header">  
                        <h3>FIADORES</h3>  
                    </div>  

                    <div class="row">  
                        <div class="col-6">  
                            <button type="button" class="btn btn-secondary btn-block" onclick="adicionarFiadorVistoria()">  
                                + Adicionar Fiador  
                            </button>  
                        </div>  
                    </div>  

                    <div id="fiadores-vistoria-container"></div>  

                    <!-- Comodos -->  
                    <div class="section-header">  
                        <h3>CÔMODOS E CARACTERÍSTICAS</h3>  
                    </div>  

                    <div class="row">  
                        <div class="col-6">  
                            <button type="button" class="btn btn-secondary btn-block" onclick="adicionarComodo()">  
                                + Adicionar Cômodo  
                            </button>  
                        </div>  
                    </div>  

                    <div id="comodos-container"></div>  

                    <!-- Botão de gerar documento -->  
                    <div class="row mt-3">  
                        <div class="col-12 text-center">  
                            <button type="button" class="btn btn-primary btn-block" onclick="gerarTermoVistoria()">  
                                🔍 GERAR TERMO DE VISTORIA  
                            </button>  
                        </div>  
                    </div>  
                </form>  

                <div id="download-section-vistoria" class="hidden mt-3">  
                    <div class="alert alert-success text-center">  
                        ✅ Termo de Vistoria gerado com sucesso!  
                    </div>  

                    <button id="download-btn-vistoria" class="btn btn-primary btn-block">  
                        📥 BAIXAR TERMO DE VISTORIA  
                    </button>  
                </div>  
            </div>  
        </div>
    `;

    // Inicializar  
    fiadoresVistoriaCount = 1;
    comodosCount = 0;
    adicionarFiadorVistoria();
    adicionarComodo();

    await loadPipefyDataVistoria();
}

// FUNÇÃO PARA ADICIONAR FIADOR VISTORIA  
function adicionarFiadorVistoria() {
    const container = document.getElementById('fiadores-vistoria-container');
    if (!container) return;

    const fiadorHTML = `
        <div class="fiador-item mb-3 p-3 border rounded" id="fiador-vistoria-${fiadoresVistoriaCount}">
            <div class="row">
                <div class="col-11">
                    <h5>Fiador ${fiadoresVistoriaCount}</h5>
                </div>
                <div class="col-1">
                    <button type="button" class="btn btn-danger btn-sm" onclick="removerFiadorVistoria(${fiadoresVistoriaCount})">×</button>
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <div class="form-group">
                        <label>Nome</label>
                        <input type="text" id="fiadorNome${fiadoresVistoriaCount}" class="form-control" placeholder="Nome completo">
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label>CPF</label>
                        <input type="text" id="fiadorCPF${fiadoresVistoriaCount}" class="form-control" placeholder="000.000.000-00">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <div class="form-group">
                        <label>RG</label>
                        <input type="text" id="fiadorRG${fiadoresVistoriaCount}" class="form-control" placeholder="0000000">
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label>Telefone</label>
                        <input type="text" id="fiadorTelefone${fiadoresVistoriaCount}" class="form-control" placeholder="(00) 00000-0000">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <div class="form-group">
                        <label>Endereço</label>
                        <input type="text" id="fiadorEndereco${fiadoresVistoriaCount}" class="form-control" placeholder="Endereço completo">
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label>E-mail</label>
                        <input type="email" id="fiadorEmail${fiadoresVistoriaCount}" class="form-control" placeholder="email@exemplo.com">
                    </div>
                </div>
            </div>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', fiadorHTML);
    fiadoresVistoriaCount++;
}

// FUNÇÃO PARA REMOVER FIADOR VISTORIA
function removerFiadorVistoria(id) {
    const fiadorElement = document.getElementById(`fiador-vistoria-${id}`);
    if (fiadorElement) {
        fiadorElement.remove();
    }
}

// FUNÇÃO PARA ADICIONAR CÔMODO
function adicionarComodo() {
    const container = document.getElementById('comodos-container');
    if (!container) return;

    comodosCount++;
    const comodoHTML = `
        <div class="comodo-container mt-3 p-3 border rounded" id="comodo-${comodosCount}">
            <div class="row">
                <div class="col-11">
                    <h4>🚪 Cômodo ${comodosCount}</h4>
                </div>
                <div class="col-1">
                    <button type="button" class="btn btn-danger btn-sm" onclick="removerComodo(${comodosCount})">×</button>
                </div>
            </div>
            <div class="form-group">
                <label>Nome do Cômodo</label>
                <input type="text" id="comodoNome${comodosCount}" class="form-control" placeholder="Ex: Sala, Quarto, Cozinha, Banheiro">
            </div>
            <div class="section-header">
                <h5>Características do Cômodo</h5>
            </div>
            <div id="caracteristicas-comodo-${comodosCount}">
                <!-- Características serão adicionadas aqui -->
            </div>
            <div class="row mt-2">
                <div class="col-12">
                    <button type="button" class="btn btn-secondary btn-block" onclick="adicionarCaracteristicaComodo(${comodosCount})">
                        + Adicionar Característica
                    </button>
                </div>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', comodoHTML);
    adicionarCaracteristicaComodo(comodosCount);
}

// FUNÇÃO PARA REMOVER CÔMODO
function removerComodo(id) {
    const comodoElement = document.getElementById(`comodo-${id}`);
    if (comodoElement) {
        comodoElement.remove();
    }
}

// FUNÇÃO PARA ADICIONAR CARACTERÍSTICA AO CÔMODO
function adicionarCaracteristicaComodo(comodoIndex) {
    const container = document.getElementById(`caracteristicas-comodo-${comodoIndex}`);
    if (!container) return;

    const caracteristicasCount = container.children.length + 1;
    const caractHTML = `
        <div class="row mt-2" id="carac-comodo-${comodoIndex}-${caracteristicasCount}">
            <div class="col-4">
                <div class="form-group">
                    <label>Item</label>
                    <input type="text" id="comodo${comodoIndex}carac${caracteristicasCount}nome" class="form-control" placeholder="Ex: Piso, Parede, Tomada">
                </div>
            </div>
            <div class="col-3">
                <div class="form-group">
                    <label>Estado</label>
                    <select id="comodo${comodoIndex}carac${caracteristicasCount}estado" class="form-control">
                        <option value="Bom">Bom</option>
                        <option value="Regular">Regular</option>
                        <option value="Ruim">Ruim</option>
                    </select>
                </div>
            </div>
            <div class="col-4">
                <div class="form-group">
                    <label>Observações</label>
                    <input type="text" id="comodo${comodoIndex}carac${caracteristicasCount}desc" class="form-control" placeholder="Descrição detalhada">
                </div>
            </div>
            <div class="col-1">
                <div class="form-group">
                    <label>&nbsp;</label>
                    <button type="button" class="btn btn-danger btn-block" onclick="removerCaracteristicaComodo(${comodoIndex}, ${caracteristicasCount})">×</button>
                </div>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', caractHTML);
}

// FUNÇÃO PARA REMOVER CARACTERÍSTICA DO CÔMODO
function removerCaracteristicaComodo(comodoIndex, caracIndex) {
    const caracElement = document.getElementById(`carac-comodo-${comodoIndex}-${caracIndex}`);
    if (caracElement) {
        caracElement.remove();
    }
}

// FUNÇÃO PARA GERAR TERMO DE VISTORIA - COM DEBUG DO SERVIDOR
async function gerarTermoVistoria() {
    console.log('Gerando termo de vistoria...');

    try {
        const dadosForm = coletarDadosVistoriaFormulario();

        // ESTRUTURA CORRETA PARA O TEMPLATE
        const dadosParaTemplate = {
            nomeLocatario: dadosForm.nomeLocatario,
            RGLocatario: dadosForm.RGLocatario,
            CPFLocatario: dadosForm.CPFLocatario,
            enderecoLocatario: dadosForm.enderecoLocatario,
            celular: dadosForm.celular,
            email: dadosForm.email,
            enderecoImovel: dadosForm.enderecoImovel,
            dataContrato: dadosForm.dataContrato,
            dataVistoria: dadosForm.dataVistoria,
            nomeVistoriador: dadosForm.nomeVistoriador,
            dia: dadosForm.dia,
            mes: dadosForm.mes,
            ano: dadosForm.ano,
            nomeTestemunha1: dadosForm.nomeTestemunha1,
            CPFTestemunha1: dadosForm.CPFTestemunha1,
            nomeTestemunha2: dadosForm.nomeTestemunha2,
            CPFTestemunha2: dadosForm.CPFTestemunha2,
            
            fiadores: dadosForm.fiadores.map(fiador => ({
                nomeFiador: fiador.nomeFiador,
                RGFiador: fiador.RGFiador,
                CPFFiador: fiador.CPFFiador,
                enderecoFiador: fiador.enderecoFiador,
                celularFiador: fiador.celularFiador,
                emailFiador: fiador.emailFiador
            })),
            
            comodos: dadosForm.comodos.map(comodo => ({
                NOMECOMODO: comodo.nome.toUpperCase(),
                caracteristicas: comodo.caracteristicas.map(carac => ({
                    nome: carac.nome,
                    estado: carac.estado,
                    descricao: carac.descricao
                }))
            }))
        };

        console.log('🎯 DADOS ENVIADOS PARA O TEMPLATE:', dadosParaTemplate);

        // DEBUG DA CONEXÃO
        const urlAPI = '/api/gerar-documento/termo-vistoria';
        console.log('🔗 Tentando acessar:', urlAPI);
        console.log('📍 URL completa:', window.location.origin + urlAPI);

        // ENVIAR PARA O SERVIDOR
        console.log('📤 Enviando dados para o servidor...');
        const response = await fetch(urlAPI, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dadosParaTemplate)
        });

        console.log('📡 Status da resposta:', response.status);
        console.log('📡 Status text:', response.statusText);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Erro do servidor:', errorText);
            throw new Error(`Servidor retornou erro ${response.status}: ${errorText}`);
        }

        const blob = await response.blob();
        console.log('✅ Documento gerado com sucesso! Tamanho:', blob.size, 'bytes');

        // DOWNLOAD
        const url = window.URL.createObjectURL(blob);
        const downloadBtn = document.getElementById('download-btn-vistoria');
        if (downloadBtn) {
            downloadBtn.onclick = () => {
                const a = document.createElement('a');
                a.href = url;
                a.download = `Termo_Vistoria_${dadosForm.nomeLocatario.replace(/\s+/g, '_')}.docx`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            };
        }

        const downloadSection = document.getElementById('download-section-vistoria');
        if (downloadSection) {
            downloadSection.classList.remove('hidden');
        }

        if (window.app && window.app.showAlert) {
            window.app.showAlert('Termo de vistoria gerado com sucesso!', 'success');
        }

    } catch (error) {
        console.error('❌ Erro ao gerar termo de vistoria:', error);
        if (window.app && window.app.showAlert) {
            window.app.showAlert(`Erro ao gerar termo de vistoria: ${error.message}`, 'error');
        }
    }
}

// FUNÇÃO PARA COLETAR DADOS DO FORMULÁRIO - CORRIGIDA
function coletarDadosVistoriaFormulario() {
    const dados = {
        nomeLocatario: document.getElementById('nomeLocatario')?.value || "",
        RGLocatario: document.getElementById('RGLocatario')?.value || "",
        CPFLocatario: document.getElementById('CPFLocatario')?.value || "",
        enderecoLocatario: document.getElementById('enderecoLocatario')?.value || "",
        celular: document.getElementById('celular')?.value || "",
        email: document.getElementById('email')?.value || "",
        enderecoImovel: document.getElementById('enderecoImovel')?.value || "",
        dataContrato: document.getElementById('dataContrato')?.value || "",
        dataVistoria: document.getElementById('dataVistoria')?.value || "",
        nomeVistoriador: document.getElementById('nomeVistoriador')?.value || "",
        dia: document.getElementById('dia')?.value || "",
        mes: document.getElementById('mes')?.value || "",
        ano: document.getElementById('ano')?.value || "",
        nomeTestemunha1: document.getElementById('nomeTestemunha1')?.value || "",
        CPFTestemunha1: document.getElementById('CPFTestemunha1')?.value || "",
        nomeTestemunha2: document.getElementById('nomeTestemunha2')?.value || "",
        CPFTestemunha2: document.getElementById('CPFTestemunha2')?.value || "",
        fiadores: [],
        comodos: []
    };

    console.log('🔍 COLETANDO FIADORES...');
    for (let i = 1; i < fiadoresVistoriaCount; i++) {
        const fiadorElement = document.getElementById(`fiador-vistoria-${i}`);
        if (fiadorElement && fiadorElement.offsetParent !== null) {
            const nome = document.getElementById(`fiadorNome${i}`)?.value || "";
            const cpf = document.getElementById(`fiadorCPF${i}`)?.value || "";
            const rg = document.getElementById(`fiadorRG${i}`)?.value || "";
            const telefone = document.getElementById(`fiadorTelefone${i}`)?.value || "";
            const endereco = document.getElementById(`fiadorEndereco${i}`)?.value || "";
            const email = document.getElementById(`fiadorEmail${i}`)?.value || "";

            if (nome.trim()) {
                dados.fiadores.push({
                    nomeFiador: nome,
                    RGFiador: rg,
                    CPFFiador: cpf,
                    enderecoFiador: endereco,
                    celularFiador: telefone,
                    emailFiador: email
                });
            }
        }
    }

    console.log('🔍 COLETANDO CÔMODOS...');
    for (let i = 1; i <= comodosCount; i++) {
        const comodoElement = document.getElementById(`comodo-${i}`);
        if (comodoElement && comodoElement.offsetParent !== null) {
            const comodoNome = document.getElementById(`comodoNome${i}`)?.value || "";
            if (comodoNome.trim()) {
                const caracteristicas = [];
                let j = 1;
                while (true) {
                    const nomeInput = document.getElementById(`comodo${i}carac${j}nome`);
                    const estadoSelect = document.getElementById(`comodo${i}carac${j}estado`);
                    const descInput = document.getElementById(`comodo${i}carac${j}desc`);
                    
                    // Verifica se o elemento existe
                    if (!nomeInput || !nomeInput.offsetParent) break;
                    
                    const caracNome = nomeInput.value || "";
                    const caracEstado = estadoSelect?.value || 'Bom';
                    const caracDesc = descInput?.value || "";

                    if (caracNome.trim()) {
                        caracteristicas.push({ 
                            nome: caracNome, 
                            estado: caracEstado, 
                            descricao: caracDesc 
                        });
                    }
                    j++;
                }
                dados.comodos.push({ 
                    nome: comodoNome, 
                    caracteristicas: caracteristicas 
                });
            }
        }
    }

    console.log('📋 DADOS COLETADOS:', {
        fiadores: dados.fiadores.length,
        comodos: dados.comodos.length,
        comodosDetalhes: dados.comodos
    });

    return dados;
}

// CARREGAR DADOS DO PIPEFY
async function loadPipefyDataVistoria() {
    try {
        const loading = document.getElementById('loading');
        const cards = await window.app.loadPipefyCards();
        if (loading) loading.classList.add('hidden');
        if (cards.length > 0) {
            const selectorContainer = document.getElementById('pipefy-selector');
            if (selectorContainer) {
                const selector = window.app.createCardSelector(cards, (card) => {
                    fillVistoriaFormWithCardData(card);
                });
                selectorContainer.appendChild(selector);
            }
        }
    } catch (error) {
        console.error('Erro ao carregar dados do Pipefy:', error);
        const loading = document.getElementById('loading');
        if (loading) loading.classList.add('hidden');
    }
}

// PREENCHER FORMULÁRIO COM DADOS DO PIPEFY
function fillVistoriaFormWithCardData(cardData) {
    console.log('🎯 Preenchendo vistoria com dados do Pipefy...');
    const dados = cardData.dadosPreenchidos;
    let camposPreenchidos = 0;

    // Mapeamento de campos do Pipefy para IDs do formulário
    const fieldMapping = {
        'nomeLocatario': 'nomeLocatario',
        'RGLocatario': 'RGLocatario',
        'CPFLocatario': 'CPFLocatario',
        'enderecoLocatario': 'enderecoLocatario',
        'celular': 'celular',
        'email': 'email',
        'enderecoImovel': 'enderecoImovel'
        
    };

    Object.keys(fieldMapping).forEach(pipefyField => {
        const formFieldId = fieldMapping[pipefyField];
        const valor = dados[pipefyField];
        const input = document.getElementById(formFieldId);
        if (input && valor && valor !== "") {
            input.value = valor;
            camposPreenchidos++;
        }
    });

    console.log(`🎉 ${camposPreenchidos} campos preenchidos na vistoria`);
    if (camposPreenchidos > 0 && window.app && window.app.showAlert) {
        window.app.showAlert(`${camposPreenchidos} campos preenchidos automaticamente!`, 'success');
    }
    return camposPreenchidos;
}