//===============================================================
// FICHA CADASTRAL - COMPLETO E CORRIGIDO
//===============================================================

let fiadoresFichaCount = 1;
let caracteristicasCount = 0;

// FUNÇÃO PRINCIPAL PARA CARREGAR A PÁGINA
async function loadFichaCadastralPage() {
    console.log('Carregando página de ficha cadastral...');

    const content = document.getElementById('page-content');
    if (!content) {
        console.error('Elemento page-content não encontrado!');
        return;
    }

    content.innerHTML = `
        <div class="page-container"> 
            <div class="page-header"> 
                <button class="btn btn-secondary" onclick="goBack()">← VOLTAR</button> 
                <h1>📄 FICHA CADASTRAL</h1> 
                <div id="pipefy-selector"></div> 
            </div>

            <div class="main-container"> 
                <div id="loading" class="alert alert-info">Carregando dados do Pipefy...</div>

                <form id="ficha-cadastral-form"> 
                    <!-- Dados do Locatário -->
                    <div class="section-header">
                        <h3>DADOS DO LOCATÁRIO</h3>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>Nome</label>
                                <input type="text" id="nomeLocatario" class="form-control" placeholder="Nome completo do locatário">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>RG</label>
                                <input type="text" id="RGLocatario" class="form-control" placeholder="00.000.000-0">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>CPF Locatário</label>
                                <input type="text" id="CPFLocatario" class="form-control" placeholder="000.000.000-00">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>Endereço</label>
                                <input type="text" id="enderecoLocatario" class="form-control" placeholder="Endereço completo">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-4">
                            <div class="form-group">
                                <label>Valor Locação</label>
                                <input type="text" id="valorLocacaoMensal" class="form-control" placeholder="R$ 0,00">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Data Entrada</label>
                                <input type="text" id="dataEntrada" class="form-control" placeholder="DD/MM/AAAA" >
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Vencimento</label>
                                <input type="text" id="dataVenc" class="form-control" placeholder="DD/MM" value="05">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>Celular</label>
                                <input type="text" id="celular" class="form-control" placeholder="(00) 00000-0000">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>E-mail</label>
                                <input type="email" id="email" class="form-control" placeholder="email@exemplo.com">
                            </div>
                        </div>
                    </div>

                    <!-- Fiadores -->
                    <div class="section-header">
                        <h3>FIADORES</h3>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <button type="button" class="btn btn-secondary btn-block" onclick="adicionarFiadorFicha()">
                                + Adicionar Fiador
                            </button>
                        </div>
                    </div>

                    <div id="fiadores-ficha-container"></div>

                    <!-- Proprietário -->
                    <div class="section-header">
                        <h3>DADOS DO PROPRIETÁRIO</h3>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>Nome Proprietário</label>
                                <input type="text" id="nomeProprietario" class="form-control" placeholder="Nome completo do proprietário">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>RG Proprietário</label>
                                <input type="text" id="RGProprietario" class="form-control" placeholder="00000000">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>CPF Proprietário</label>
                                <input type="text" id="CPFProprietario" class="form-control" placeholder="000.000.000-00">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>Endereço Proprietário</label>
                                <input type="text" id="enderecoProprietario" class="form-control" placeholder="Endereço completo">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>Celular Proprietário</label>
                                <input type="text" id="celProprietario" class="form-control" placeholder="(00) 00000-0000">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>E-mail Proprietário</label>
                                <input type="email" id="emailProprietario" class="form-control" placeholder="email@exemplo.com">
                            </div>
                        </div>
                    </div>

                    <!-- Dados Bancários -->
                    <div class="section-header">
                        <h3>DADOS BANCÁRIOS</h3>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>Banco</label>
                                <input type="text" id="banco" class="form-control" placeholder="Nome do banco">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>Agência</label>
                                <input type="text" id="agencia" class="form-control" placeholder="Número da agência">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>Conta Corrente</label>
                                <input type="text" id="conta" class="form-control" placeholder="Número da conta">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>Chave PIX</label>
                                <input type="text" id="pix" class="form-control" placeholder="Chave PIX">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>Declaração IR</label>
                                <input type="text" id="declaracaoImposto" class="form-control" placeholder="Declaração de imposto de renda">
                            </div>
                        </div>
                    </div>

                    <!-- Dados do Imóvel -->
                    <div class="section-header">
                        <h3>DADOS DO IMÓVEL (Endereço) </h3>
                    </div>

                    <div class="form-group">
                        <input type="text" id="enderecoImovel" class="form-control" placeholder="Endereço completo do imóvel">
                    </div>

                    <!-- Características -->
                    <div class="section-header">
                        <h3>CARACTERÍSTICAS DO IMÓVEL</h3>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <button type="button" class="btn btn-secondary btn-block" onclick="adicionarCaracteristica()">
                                + Adicionar Característica
                            </button>
                        </div>
                    </div>

                    <div id="caracteristicas-container"></div>

                    <!-- Serviços e Tributos -->
                    <div class="section-header">
                        <h3>SERVIÇOS E TRIBUTOS</h3>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>CEMIG Instalação</label>
                                <input type="text" id="CemigInstalacao" class="form-control" placeholder="Número da instalação">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>COPASA Matrícula</label>
                                <input type="text" id="matriculaCopasa" class="form-control" placeholder="Número da matrícula">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>IPTU</label>
                                <input type="text" id="IPTUImovel" class="form-control" placeholder="IPTU">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>Inscrição Cadastral</label>
                                <input type="text" id="InscricaoIPTU" class="form-control" placeholder="Inscrição Cadastral">
                            </div>
                        </div>
                    </div>

                    <!-- Botão de gerar documento -->
                    <div class="row mt-3">
                        <div class="col-12 text-center">
                            <button type="button" class="btn btn-primary btn-block" onclick="gerarFichaCadastral()">
                                📄 GERAR FICHA CADASTRAL
                            </button>
                        </div>
                    </div>
                </form>

                <div id="download-section-ficha" class="hidden mt-3">
                    <div class="alert alert-success text-center">
                        ✅ Ficha gerada com sucesso!
                    </div>
                    <button id="download-btn-ficha" class="btn btn-primary btn-block">
                        📥 BAIXAR FICHA CADASTRAL
                    </button>
                </div>
            </div>
        </div>
    `;

    // Inicializar
    fiadoresFichaCount = 1;
    caracteristicasCount = 0;
    adicionarFiadorFicha();
    adicionarCaracteristica();

    await loadPipefyDataFicha();
}

// ADICIONAR FIADOR - ATUALIZADA
function adicionarFiadorFicha() {
    const container = document.getElementById('fiadores-ficha-container');
    if (!container) return;

    const fiadorHTML = `
        <div class="fiador-item mb-3 p-3 border rounded" id="fiador-ficha-${fiadoresFichaCount}">
            <div class="row">
                <div class="col-11">
                    <h5>Fiador ${fiadoresFichaCount}</h5>
                </div>
                <div class="col-1">
                    <button type="button" class="btn btn-danger btn-sm" onclick="removerFiadorFicha(${fiadoresFichaCount})">×</button>
                </div>
            </div>

            <div class="row">
                <div class="col-6">
                    <div class="form-group">
                        <label>Nome</label>
                        <input type="text" id="fiadorNome${fiadoresFichaCount}" class="form-control" placeholder="Nome completo">
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label>RG</label>
                        <input type="text" id="fiadorRG${fiadoresFichaCount}" class="form-control" placeholder="00.000.000-0">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-6">
                    <div class="form-group">
                        <label>CPF</label>
                        <input type="text" id="fiadorCPF${fiadoresFichaCount}" class="form-control" placeholder="000.000.000-00">
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label>Endereço</label>
                        <input type="text" id="fiadorEndereco${fiadoresFichaCount}" class="form-control" placeholder="Endereço completo">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-6">
                    <div class="form-group">
                        <label>Celular</label>
                        <input type="text" id="fiadorCelular${fiadoresFichaCount}" class="form-control" placeholder="(00) 00000-0000">
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label>E-mail</label>
                        <input type="email" id="fiadorEmail${fiadoresFichaCount}" class="form-control" placeholder="email@exemplo.com">
                    </div>
                </div>
            </div>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', fiadorHTML);
    fiadoresFichaCount++;
}

// REMOVER FIADOR - ATUALIZADA
function removerFiadorFicha(id) {
    const fiadorElement = document.getElementById(`fiador-ficha-${id}`);
    if (fiadorElement) {
        fiadorElement.remove();
    }
}

// ADICIONAR CARACTERÍSTICA
function adicionarCaracteristica() {
    const container = document.getElementById('caracteristicas-container');
    if (!container) return;

    caracteristicasCount++;
    const caracHTML = `
        <div class="form-group">
            <input type="text" id="caracteristicas${caracteristicasCount}" class="form-control" placeholder="Ex: 3 quartos, 2 banheiros, garagem, etc.">
        </div>
    `;

    container.insertAdjacentHTML('beforeend', caracHTML);
}

// GERAR FICHA CADASTRAL - CORRIGIDA
async function gerarFichaCadastral() {
    console.log('📄 Gerando ficha cadastral...');

    try {
        const dados = coletarDadosFichaCadastral();

        // DEBUG DETALHADO
        console.log('📦 DADOS COLETADOS FICHA:');
        console.log('- Nome Locatário:', dados.nomeLocatario);
        console.log('- Total de Fiadores:', dados.fiadores.length);
        console.log('- Fiadores:', dados.fiadores);
        
        if (dados.fiadores.length === 0) {
            console.log('⚠️  AVISO: Nenhum fiador foi preenchido!');
        }

        console.log('🚀 Enviando para o servidor...');

        const response = await fetch('/api/gerar-documento/ficha-cadastral', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dados)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro no servidor: ${response.status} - ${errorText}`);
        }

        const blob = await response.blob();

        if (blob.size === 0) {
            throw new Error('Arquivo vazio recebido do servidor');
        }

        const url = window.URL.createObjectURL(blob);

        const downloadBtn = document.getElementById('download-btn-ficha');
        if (downloadBtn) {
            downloadBtn.onclick = () => {
                const a = document.createElement('a');
                a.href = url;
                a.download = `Ficha_Cadastral_${dados.nomeLocatario || 'Sem_Nome'}.docx`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            };
        }

        const downloadSection = document.getElementById('download-section-ficha');
        if (downloadSection) {
            downloadSection.classList.remove("hidden");
        }

        if (window.app && window.app.showAlert) {
            window.app.showAlert('Ficha cadastral gerada com sucesso!', 'success');
        }
    } catch (error) {
        console.error('❌ Erro ao gerar ficha:', error);
        if (window.app && window.app.showAlert) {
            window.app.showAlert('Erro ao gerar ficha cadastral: ' + error.message, 'error');
        }
    }
}

// COLETAR DADOS DO FORMULÁRIO - CORRIGIDA
function coletarDadosFichaCadastral() {
    const getValue = (id) => {
        const element = document.getElementById(id);
        return element ? element.value : "";
    };

    const dados = {
        // Dados do Locatário
        nomeLocatario: getValue('nomeLocatario'),
        RGLocatario: getValue('RGLocatario'),
        CPFLocatario: getValue('CPFLocatario'),
        enderecoLocatario: getValue('enderecoLocatario'),
        valorLocacaoMensal: getValue('valorLocacaoMensal'),
        dataEntrada: getValue('dataEntrada'),          
        dataVenc: getValue('dataVenc'),
        celular: getValue('celular'),
        email: getValue('email'),

        // Dados do Proprietário
        nomeProprietario: getValue('nomeProprietario'),
        RGProprietario: getValue('RGProprietario'),
        CPFProprietario: getValue('CPFProprietario'),
        enderecoProprietario: getValue('enderecoProprietario'),
        celProprietario: getValue('celProprietario'),
        emailProprietario: getValue('emailProprietario'),

        // Dados Bancários
        banco: getValue('banco'),
        agencia: getValue('agencia'),
        conta: getValue('conta'),
        pix: getValue('pix'),
        declaracaoImposto: getValue('declaracaoImposto'),

        // Dados do Imóvel
        enderecoImovel: getValue('enderecoImovel'),

        // Serviços
        CemigInstalacao: getValue('CemigInstalacao'),
        matriculaCopasa: getValue('matriculaCopasa'),
        IPTUImovel: getValue('IPTUImovel'),
        InscricaoIPTU: getValue('InscricaoIPTU'),

        // Características
        caracteristicas: [],

        // Fiadores - COM OS NOMES CORRETOS PARA O TEMPLATE
        fiadores: []
    };

    // Coletar características
    for (let i = 1; i <= caracteristicasCount; i++) {
        const caracteristica = getValue(`caracteristica${i}`);
        if (caracteristica && caracteristica.trim() !== "") {
            dados.caracteristicas.push(caracteristica.trim());
        }
    }

    // Coletar fiadores com os nomes corretos para o template
    for (let i = 1; i < fiadoresFichaCount; i++) {
        const nomeFiador = getValue(`fiadorNome${i}`);
        
        // Só adiciona fiador se tiver nome
        if (nomeFiador && nomeFiador.trim() !== "") {
            const fiadorObj = {
                nomeFiador: nomeFiador,
                RGFiador: getValue(`fiadorRG${i}`) || "",
                CPFFiador: getValue(`fiadorCPF${i}`) || "",
                enderecoFiador: getValue(`fiadorEndereco${i}`) || "",
                celularFiador: getValue(`fiadorCelular${i}`) || "",
                emailFiador: getValue(`fiadorEmail${i}`) || "",
            };
            
            dados.fiadores.push(fiadorObj);
            
            console.log(`✅ Fiador ${i} da ficha:`, fiadorObj);
        }
    }

    console.log('📦 Dados completos da ficha para envio:', {
        nomeLocatario: dados.nomeLocatario,
        totalFiadores: dados.fiadores.length,
        fiadores: dados.fiadores
    });

    return dados;
}

// CARREGAR DADOS DO PIPEFY
async function loadPipefyDataFicha() {
    try {
        const loading = document.getElementById('loading');
        const cards = await window.app.loadPipefyCards();

        if (loading) loading.classList.add('hidden');

        if (cards.length > 0) {
            const selectorContainer = document.getElementById('pipefy-selector');
            if (selectorContainer) {
                const selector = window.app.createCardSelector(cards, (card) => {
                    fillFichaFormWithCardData(card);
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

// MAPEAMENTO PERSONALIZADO PIPEFY -> FORMULÁRIO
function getPipefyFieldMappings() {
    return {
        // Dados do Locatário
        'nomeLocatario': 'nomeLocatario',
        'RGLocatario': 'RGLocatario',
        'CPFLocatario': 'CPFLocatario',
        'enderecoImovel': 'enderecoImovel',
        'valor_aluguel': 'valorLocacaoMensal',
        'data_entrada': 'dataEntrada',         
        'vencimento': 'dataVenc',  
        'celular': 'celular',
        'email': 'email',
        
        // Dados do Proprietário
        'nome_proprietario': 'nomeProprietario',
        'rg_proprietario': 'RGProprietario',
        'cpf_proprietario': 'CPFProprietario',
        'endereco_proprietario': 'enderecoProprietario',
        'celular_proprietario': 'celProprietario',
        'email_proprietario': 'emailProprietario',
        
        // Dados Bancários
        'banco': 'banco',
        'agencia': 'agencia',
        'conta_corrente': 'conta',
        'chave_pix': 'pix',
        'declaracaoImposto': 'declaracaoImposto',
        
        // Dados do Imóvel
        'enderecoImovel': 'enderecoImovel',
        'caracteristicasImovel': 'caracteristicasImovel',
        
        // Serviços
        'cemig_instalacao': 'CemigInstalacao',
        'copasa_matricula': 'matriculaCopasa',
        'iptu': 'IPTUimovel',
        'inscricao_iptu': 'InscricaoIPTU',
        
        // Fiadores
        'nomeFiador1': 'nomeFiador',
        'CPFFiador1': 'CPFFiador',
        'RGFiador1': 'RGFiador',
        'enderecoFiador1': 'enderecoFiador',
        'celularFiador1': 'celularFiador',
        'emailFiador1': 'emailFiador',
        
    };
}

// FUNÇÃO MELHORADA PARA PREENCHER FORMULÁRIO
function fillFichaFormWithCardData(cardData) {
    console.log('🎯 Preenchendo ficha cadastral com dados do Pipefy...');
    
    const dados = cardData.dadosPreenchidos;
    const mappings = getPipefyFieldMappings();
    let camposPreenchidos = 0;

    // Preenchimento por mapeamento personalizado E direto
    Object.keys(dados).forEach(campoPipefy => {
        const valor = dados[campoPipefy];
        
        // 1. Tentar preencher pelo mapeamento personalizado
        const campoFormulario = mappings[campoPipefy];
        if (campoFormulario) {
            const input = document.getElementById(campoFormulario);
            if (input && valor && valor !== "" && valor !== "undefined" && valor !== "null") {
                input.value = valor;
                camposPreenchidos++;
                console.log(`✅ ${campoPipefy} -> ${campoFormulario}: ${valor}`);
            }
        }
        
        // 2. Também tentar preenchimento direto (para compatibilidade)
        const inputDireto = document.getElementById(campoPipefy);
        if (inputDireto && valor && valor !== "" && valor !== "undefined" && valor !== "null") {
            inputDireto.value = valor;
            camposPreenchidos++;
            console.log(`✅ ${campoPipefy}: ${valor}`);
        }
    });

    console.log(`🎉 ${camposPreenchidos} campos preenchidos automaticamente`);
    
    if (camposPreenchidos > 0 && window.app && window.app.showAlert) {
        window.app.showAlert(`${camposPreenchidos} campos preenchidos automaticamente!`, 'success');
    }
    
    return camposPreenchidos;
}
