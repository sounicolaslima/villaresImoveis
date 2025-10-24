//===========================================================
// CONTRATO DE LOCAÇÃO - COMPLETO E CORRIGIDO
//===========================================================

let fiadoresCount = 1;

// FUNÇÃO PRINCIPAL PARA CARREGAR A PÁGINA
async function loadContratoLocacaoPage() {
    console.log('Carregando página de contrato de locação...');

    const content = document.getElementById('page-content');
    if (!content) {
        console.error('Elemento page-content não encontrado!');
        return;
    }

    content.innerHTML = `
        <div class="page-container">
            <div class="page-header">
                <button class="btn btn-secondary" onclick="goBack()">← VOLTAR</button>
                <h1>📝 CONTRATO DE LOCAÇÃO</h1>
                <div id="pipefy-selector"></div>
            </div>

            <div class="main-container">
                <div id="loading" class="alert alert-info">Carregando dados do Pipefy...</div>

                <form id="contrato-locacao-form">
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
                                <label>CPF</label>
                                <input type="text" id="cpf_locatario" class="form-control" placeholder="000.000.000-00">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>E-mail</label>
                                <input type="email" id="email" class="form-control" placeholder="email@exemplo.com">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>Endereço</label>
                                <input type="text" id="endereco" class="form-control" placeholder="Endereço completo">
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
                        <div class="col-4">
                            <div class="form-group">
                                <label>Data de Entrada</label>
                                <input type="text" id="dataEntrada" class="form-control" placeholder="DD/MM/AAAA" value="${new Date().toLocaleDateString('pt-BR')}">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Vencimento</label>
                                <input type="text" id="vencimento" class="form-control" placeholder="Dia do vencimento" value="05">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Valor da Locação</label>
                                <input type="text" id="valorLocacao" class="form-control" placeholder="R$ 0,00 (Valor por extenso)">
                            </div>
                        </div>
                    </div>

                    <!-- Fiadores -->
                    <div class="section-header">
                        <h3>FIADORES</h3>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <button type="button" class="btn btn-secondary btn-block" onclick="adicionarFiador()">
                                + Adicionar Fiador
                            </button>
                        </div>
                    </div>

                    <div id="fiadores-container"></div>

                    <!-- Dados do Proprietário -->
                    <div class="section-header">
                        <h3>DADOS DO PROPRIETÁRIO</h3>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>Nome Proprietário</label>
                                <input type="text" id="nomeProprietario" class="form-control" placeholder="Nome completo">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>RG Proprietário</label>
                                <input type="text" id="RGProprietario" class="form-control" placeholder="0000000">
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

                    <!-- Dados do Imóvel -->
                    <div class="section-header">
                        <h3>DADOS DO IMÓVEL</h3>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>Tipo do Imóvel</label>
                                <input type="text" id="tipoDoImovel" class="form-control" placeholder="Casa, Apartamento, etc.">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>Endereço do Imóvel</label>
                                <input type="text" id="EnderecoImovel" class="form-control" placeholder="Endereço completo">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>CEP</label>
                                <input type="text" id="CEPImovel" class="form-control" placeholder="00000-000">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>Cidade</label>
                                <input type="text" id="CidadeImovel" class="form-control" placeholder="Cidade/UF">
                            </div>
                        </div>
                    </div>

                    <!-- Características do Imóvel -->
                    <div class="section-header">
                        <h3>CARACTERÍSTICAS DO IMÓVEL</h3>
                    </div>

                    <div class="form-group">
                        <textarea id="caracteristicasImovel" class="form-control" rows="3" placeholder="Ex: 3 quartos, 2 banheiros, garagem, área de serviço, etc."></textarea>
                    </div>

                    <!-- Serviços e Tributos -->
                    <div class="section-header">
                        <h3>SERVIÇOS E TRIBUTOS</h3>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>Matrícula Copasa</label>
                                <input type="text" id="matriculaCopasa" class="form-control" placeholder="Número da matrícula">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>Hidrômetro Copasa</label>
                                <input type="text" id="hidrometroCopasa" class="form-control" placeholder="Número do hidrômetro">
                            </div>
                        </div>
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
                                <label>N° Medidor</label>
                                <input type="text" id="medidor" class="form-control" placeholder="Número do medidor">
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
                                <label>Inscrição IPTU</label>
                                <input type="text" id="inscricaoIPTU" class="form-control" placeholder="Número de inscrição">
                            </div>
                        </div>
                    </div>

                    <!-- Duração do Contrato -->
                    <div class="section-header">
                        <h3>DURAÇÃO DO CONTRATO</h3>
                    </div>

                    <div class="row">
                        <div class="col-4">
                            <div class="form-group">
                                <label>Duração</label>
                                <input type="text" id="duracao" class="form-control" placeholder="Ex: 12 meses" value="12 meses">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Data Início</label>
                                <input type="text" id="dataInicio" class="form-control" placeholder="DD/MM/AAAA" value="${new Date().toLocaleDateString('pt-BR')}">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Data Término</label>
                                <input type="text" id="dataTermino" class="form-control" placeholder="DD/MM/AAAA" value="${new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString('pt-BR')}">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-4">
                            <div class="form-group">
                                <label>Valor Mensal</label>
                                <input type="text" id="ValorLocacaoMensal" class="form-control" placeholder="0,00 (valor por extenso)">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Mês de Desocupação</label>
                                <input type="text" id="mesDeDesocupacao" class="form-control" placeholder="Ex: 12 (décimo segundo)">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Data do Contrato</label>
                                <input type="text" id="dataContrato" class="form-control" placeholder="Ex: Dia, Mês de Ano">
                            </div>
                        </div>
                    </div>

                    <!-- Botão de gerar documento -->
                    <div class="row mt-3">
                        <div class="col-12 text-center">
                            <button type="button" class="btn btn-primary btn-block" onclick="gerarContratoLocacao()">
                                📝 GERAR CONTRATO DE LOCAÇÃO
                            </button>
                        </div>
                    </div>
                </form>

                <div id="download-section-locacao" class="hidden mt-3">
                    <div class="alert alert-success text-center">
                        ✅ Contrato gerado com sucesso!
                    </div>
                    <button id="download-btn-locacao" class="btn btn-primary btn-block">
                        📥 BAIXAR CONTRATO
                    </button>
                </div>
            </div>
        </div>
    `;

    // Inicializar fiadores
    fiadoresCount = 1;
    adicionarFiador();
    
    // Configurar Pipefy se disponível
    await loadPipefyDataContrato();
}

// FUNÇÃO PARA ADICIONAR FIADOR
function adicionarFiador() {
    const container = document.getElementById('fiadores-container');
    const fiadorHTML = `
        <div class="fiador-item mb-3 p-3 border rounded" id="fiador-${fiadoresCount}">
            <div class="row">
                <div class="col-11">
                    <h5>Fiador ${fiadoresCount}</h5>
                </div>
                <div class="col-1">
                    <button type="button" class="btn btn-danger btn-sm" onclick="removerFiador(${fiadoresCount})">×</button>
                </div>
            </div>

            <div class="row">
                <div class="col-6">
                    <div class="form-group">
                        <label>Nome</label>
                        <input type="text" id="fiadorNome${fiadoresCount}" class="form-control" placeholder="Nome completo">
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label>RG</label>
                        <input type="text" id="fiadorRG${fiadoresCount}" class="form-control" placeholder="00.000.000-0">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-6">
                    <div class="form-group">
                        <label>CPF</label>
                        <input type="text" id="fiadorCPF${fiadoresCount}" class="form-control" placeholder="000.000.000-00">
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label>Endereço</label>
                        <input type="text" id="fiadorEndereco${fiadoresCount}" class="form-control" placeholder="Endereço completo">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-6">
                    <div class="form-group">
                        <label>Celular</label>
                        <input type="text" id="fiadorCelular${fiadoresCount}" class="form-control" placeholder="(00) 00000-0000">
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label>E-mail</label>
                        <input type="email" id="fiadorEmail${fiadoresCount}" class="form-control" placeholder="email@exemplo.com">
                    </div>
                </div>
            </div>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', fiadorHTML);
    fiadoresCount++;
}

// FUNÇÃO PARA REMOVER FIADOR
function removerFiador(id) {
    const fiadorElement = document.getElementById(`fiador-${id}`);
    if (fiadorElement) {
        fiadorElement.remove();
    }
}

// FUNÇÃO PARA GERAR CONTRATO DE LOCAÇÃO
// FUNÇÃO PARA GERAR CONTRATO DE LOCAÇÃO
async function gerarContratoLocacao() {
    console.log('🎯 Clicou em gerar contrato!');

    try {
        const dados = coletarDadosFormulario();

        console.log('📦 Dados coletados:', dados);

        const response = await fetch('/api/gerar-documento/contrato-locacao', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dados)
        });

        console.log('📡 Resposta do servidor:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro no servidor: ${response.status} - ${errorText}`);
        }

        const blob = await response.blob();
        console.log('📄 Blob recebido:', blob.size, 'bytes');

        if (blob.size === 0) {
            throw new Error('Arquivo vazio recebido do servidor');
        }

        const url = window.URL.createObjectURL(blob);

        const downloadBtn = document.getElementById('download-btn-locacao');
        if (downloadBtn) {
            downloadBtn.onclick = () => {
                const a = document.createElement('a');
                a.href = url;
                a.download = `Contrato_Locacao_${dados.nomeLocatario || 'Sem_Nome'}.docx`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            };
        }

        const downloadSection = document.getElementById('download-section-locacao');
        if (downloadSection) {
            downloadSection.classList.remove('hidden');
        }

        if (window.app && window.app.showAlert) {
            window.app.showAlert('Contrato de locação gerado com sucesso!', 'success');
        }

    } catch (error) {
        console.error('❌ Erro ao gerar contrato:', error);
        if (window.app && window.app.showAlert) {
            window.app.showAlert(`Erro ao gerar contrato: ${error.message}`, 'error');
        }
    }
}

// FUNÇÃO PARA COLETAR DADOS DO FORMULÁRIO
function coletarDadosFormulario() {
    // Função SIMPLES para pegar valor
    const getValue = (id) => {
        const element = document.getElementById(id);
        return element ? element.value : "";
    };

    // Dados básicos - se não preencher, fica vazio
    const dados = {
        // Dados do Locatário
        nomeLocatario: getValue('nomeLocatario'),
        RGLocatario: getValue('RG'),
        CPFLocatario: getValue('cpf_locatario'),
        endereco: getValue('endereco'),
        valorLocacaoMensal: getValue('valorLocacao'),
        dataEntrada: getValue('dataEntrada'),
        dataVenc: getValue('vencimento'),
        celular: getValue('celular'),
        email: getValue('email'),

        // Dados do Proprietário
        nomeProprietario: getValue('nomeProprietario'),
        RGProprietario: getValue('RGProprietario'),
        CPFProprietario: getValue('CPFProprietario'),
        enderecoProprietario: getValue('enderecoProprietario'),
        celProprietario: getValue('celProprietario'),
        emailProprietario: getValue('emailProprietario'),

        // Dados do Imóvel
        tipoDoImovel: getValue('tipoDoImovel'),
        enderecoImovel: getValue('EnderecoImovel'),
        CEPImovel: getValue('CEPImovel'),
        cidadeImovel: getValue('CidadeImovel'),
        caracteristicasImovel: getValue('caracteristicasImovel'),

        // Serviços
        matriculaCopasa: getValue('matriculaCopasa'),
        hidrometroCopasa: getValue('hidrometroCopasa'),
        CemigInstalacao: getValue('CemigInstalacao'),
        numeroMedidor: getValue('medidor'),
        IPTUImovel: getValue('IPTUImovel'),
        InscricaoIPTU: getValue('inscricaoIPTU'),

        // Duração do Contrato
        duracao: getValue('duracao'),
        dataInicio: getValue('dataInicio'),
        dataTermino: getValue('dataTermino'),
        valorLocacaoMensal: getValue('ValorLocacaoMensal'),
        mesDeDesocupacao: getValue('mesDeDesocupacao'),
        dataContrato: getValue('dataContrato'),

        // Fiadores - array vazio se não tiver
        fiadores: []
    };

    // Coletar fiadores apenas se existirem
    for (let i = 1; i < fiadoresCount; i++) {
        const nomeFiador = getValue(`fiadorNome${i}`);
        
        // Só adiciona fiador se tiver nome
        if (nomeFiador && nomeFiador.trim() !== "") {
            dados.fiadores.push({
                nome: nomeFiador,
                rg: getValue(`fiadorRG${i}`),
                cpf: getValue(`fiadorCPF${i}`),
                endereco: getValue(`fiadorEndereco${i}`),
                celular: getValue(`fiadorCelular${i}`),
                email: getValue(`fiadorEmail${i}`),
            });
        }
    }

    return dados;
}

// FUNÇÃO PARA VALIDAR DADOS
function validarDados(dados) {
    const camposObrigatorios = [
        'nomeLocatario', 'RG', 'cpf_locatario', 'endereco', 'valorLocacao',
        'nomeProprietario', 'tipoDoImovel', 'EnderecoImovel',
        'duracao', 'dataInicio', 'dataTermino', 'ValorLocacaoMensal'
    ];

    for (const campo of camposObrigatorios) {
        if (!dados[campo] || dados[campo].trim() === "") {
            console.error(`Campo obrigatório não preenchido: ${campo}`);
            return false;
        }
    }

    return true;
}

// CARREGAR DADOS DO PIPEFY
async function loadPipefyDataContrato() {
    try {
        const loading = document.getElementById('loading');
        const cards = await window.app.loadPipefyCards();

        if (loading) loading.classList.add('hidden');

        if (cards.length > 0) {
            const selectorContainer = document.getElementById('pipefy-selector');
            if (selectorContainer) {
                const selector = window.app.createCardSelector(cards, (card) => {
                    fillContratoFormWithCardData(card);
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
function fillContratoFormWithCardData(cardData) {
    console.log('🎯 Preenchendo contrato locação com dados do Pipefy...');
    
    const dados = cardData.dadosPreenchidos;
    let camposPreenchidos = 0;

    Object.keys(dados).forEach(campo => {
        const valor = dados[campo];
        const input = document.getElementById(campo);
        
        // VOLTAR PARA VERSÃO ORIGINAL (que estava funcionando)
        if (input && valor && valor !== "" && valor !== "undefined" && valor !== "null") {
            input.value = valor;
            camposPreenchidos++;
            console.log(`✅ ${campo}: ${valor}`);
        }
    });

    console.log(`🎉 ${camposPreenchidos} campos preenchidos no contrato`);
    
    if (camposPreenchidos > 0 && window.app && window.app.showAlert) {
        window.app.showAlert(`${camposPreenchidos} campos preenchidos automaticamente!`, 'success');
    }
    
    return camposPreenchidos;
}


