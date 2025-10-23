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
                                <input type="text" id="RG" class="form-control" placeholder="00.000.000-0">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>CPF Locatário</label>
                                <input type="text" id="cpf_locatario" class="form-control" placeholder="000.000.000-00">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>Endereço</label>
                                <input type="text" id="endereco" class="form-control" placeholder="Endereço completo">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-4">
                            <div class="form-group">
                                <label>Valor Locação</label>
                                <input type="text" id="valorLocacao" class="form-control" placeholder="R$ 0,00">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Data Entrada</label>
                                <input type="text" id="dataEntrada" class="form-control" placeholder="DD/MM/AAAA" value="${new Date().toLocaleDateString('pt-BR')}">
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
                                <label>Declaração IR</label>
                                <input type="text" id="declaracaoImposto" class="form-control" placeholder="Declaração de imposto de renda">
                            </div>
                        </div>
                    </div>

                    <!-- Dados do Imóvel -->
                    <div class="section-header">
                        <h3>DADOS DO IMÓVEL</h3>
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
                                <input type="text" id="CemigInstal" class="form-control" placeholder="Número da instalação">
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
                                <input type="text" id="IPTU" class="form-control" placeholder="IPTU">
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

// ADICIONAR FIADOR
function adicionarFiadorFicha() {
    const container = document.getElementById('fiadores-ficha-container');
    if (!container) return;

    const fiadorHTML = `
        <div class="fiador-dynamic-group">
            <button type="button" class="remove-fiador" onclick="removerFiadorFicha(this)">×</button>
            <h5>Fiador ${fiadoresFichaCount}</h5>
            <div class="row">
                <div class="col-6">
                    <div class="form-group">
                        <label>Nome</label>
                        <input type="text" id="fiador_ficha${fiadoresFichaCount}_nome" class="form-control" placeholder="Nome completo">
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label>RG</label>
                        <input type="text" id="fiador_ficha${fiadoresFichaCount}_rg" class="form-control" placeholder="00.000.000-0">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <div class="form-group">
                        <label>CPF</label>
                        <input type="text" id="fiador_ficha${fiadoresFichaCount}_cpf" class="form-control" placeholder="000.000.000-00">
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label>Celular</label>
                        <input type="text" id="fiador_ficha${fiadoresFichaCount}_cel" class="form-control" placeholder="(00) 00000-0000">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <div class="form-group">
                        <label>Endereço</label>
                        <input type="text" id="fiador_ficha${fiadoresFichaCount}_end" class="form-control" placeholder="Endereço completo">
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label>E-mail</label>
                        <input type="email" id="fiador_ficha${fiadoresFichaCount}_email" class="form-control" placeholder="email@exemplo.com">
                    </div>
                </div>
            </div>
        </div>
    `;

    container.innerHTML += fiadorHTML;
    fiadoresFichaCount++;
}

// REMOVER FIADOR
function removerFiadorFicha(button) {
    const fiadorGroup = button.parentElement;
    fiadorGroup.remove();
    // Reorganizar contadores se necessário
    fiadoresFichaCount = Math.max(1, fiadoresFichaCount - 1);
}

// ADICIONAR CARACTERÍSTICA
function adicionarCaracteristica() {
    const container = document.getElementById('caracteristicas-container');
    if (!container) return;

    caracteristicasCount++;
    const caracHTML = `
        <div class="form-group">
            <input type="text" id="caracteristica${caracteristicasCount}" class="form-control" placeholder="Ex: 3 quartos, 2 banheiros, garagem, etc.">
        </div>
    `;

    container.innerHTML += caracHTML;
}

// GERAR FICHA CADASTRAL
async function gerarFichaCadastral() {
    console.log('📄 Gerando ficha cadastral...');

    try {
        const formData = collectFichaCadastralFormData();

        console.log('Dados do formulário:', formData);

        const response = await fetch('/api/gerar-documento/ficha-cadastral', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
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
                a.download = 'Ficha_Cadastral.docx';
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

// COLETAR DADOS DO FORMULÁRIO
function collectFichaCadastralFormData() {
    const getValue = (id, defaultValue = "") => {
        const element = document.getElementById(id);
        return element ? (element.value || defaultValue) : defaultValue;
    };

    const data = {
        nomeLocatario: getValue('nomeLocatario'),
        RG: getValue('RG'),
        cpf_locatario: getValue('cpf_locatario'),
        endereco: getValue('endereco'),
        valorLocacao: getValue('valorLocacao'),
        dataEntrada: getValue('dataEntrada'),
        dataVenc: getValue('dataVenc'),
        celular: getValue('celular'),
        email: getValue('email'),
        nomeProprietario: getValue('nomeProprietario'),
        RGProprietario: getValue('RGProprietario'),
        CPFProprietario: getValue('CPFProprietario'),
        enderecoProprietario: getValue('enderecoProprietario'),
        celProprietario: getValue('celProprietario'),
        emailProprietario: getValue('emailProprietario'),
        banco: getValue('banco'),
        agencia: getValue('agencia'),
        conta: getValue('conta'),
        declaracaoImposto: getValue('declaracaoImposto'),
        enderecoImovel: getValue('enderecoImovel'),
        CemigInstal: getValue('CemigInstal'),
        matriculaCopasa: getValue('matriculaCopasa'),
        IPTU: getValue('IPTU'),
        fiadores: [],
        caracteristicas: []
    };

    // Coletar fiadores
    for (let i = 1; i < fiadoresFichaCount; i++) {
        const fiador = {
            nome: getValue(`fiador_ficha${i}_nome`),
            rg: getValue(`fiador_ficha${i}_rg`),
            cpf: getValue(`fiador_ficha${i}_cpf`),
            end: getValue(`fiador_ficha${i}_end`),
            cel: getValue(`fiador_ficha${i}_cel`),
            email: getValue(`fiador_ficha${i}_email`)
        };

        // Só adicionar se tiver pelo menos nome ou CPF
        if (fiador.nome || fiador.cpf) {
            data.fiadores.push(fiador);
        }
    }

    // Coletar características
    for (let i = 1; i <= caracteristicasCount; i++) {
        const caracteristica = getValue(`caracteristica${i}`);
        if (caracteristica.trim()) {
            data.caracteristicas.push(caracteristica.trim());
        }
    }

    return data;
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

// PREENCHER FORMULÁRIO COM DADOS DO PIPEFY
function fillFichaFormWithCardData(card) {
    const fieldMappings = {
        'nomeLocatario': 'nome_completo',
        'cpf_locatario': 'cpf',
        'email': 'email',
        'celular': 'telefone',
        'endereco': 'endereco',
        'valorLocacao': 'valor'
    };

    Object.keys(fieldMappings).forEach(formField => {
        const pipefyField = fieldMappings[formField];
        const value = card.fields ? card.fields[pipefyField] : "";
        const input = document.getElementById(formField);
        if (input && value) {
            input.value = value;
        }
    });

    if (window.app && window.app.showAlert) {
        window.app.showAlert('Dados do Pipefy carregados com sucesso!', 'success');
    }
}