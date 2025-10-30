//===========================================================
// CONTRATO DE LOCAÇÃO - VERSÃO CORRIGIDA E SIMPLIFICADA
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
                                <label>Nome Completo</label>
                                <input type="text" id="nomeLocatario" class="form-control" placeholder="Nome completo do locatário">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-4">
                            <div class="form-group">
                                <label>Nacionalidade</label>
                                <input type="text" id="nacionalidadeLocatario" class="form-control" placeholder="Ex: Brasileira" value="Brasileira">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Estado Civil</label>
                                <input type="text" id="estadoCivilLocatario" class="form-control" placeholder="Ex: Solteiro, Casado">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Profissão</label>
                                <input type="text" id="profissaoLocatario" class="form-control" placeholder="Profissão do locatário">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>RG</label>
                                <input type="text" id="RGLocatario" class="form-control" placeholder="00.000.000-0">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>CPF</label>
                                <input type="text" id="CPFLocatario" class="form-control" placeholder="000.000.000-00">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12">
                            <div class="form-group">
                                <label>Endereço Completo</label>
                                <input type="text" id="enderecoLocatario" class="form-control" placeholder="Endereço completo do locatário">
                            </div>
                        </div>
                    </div>

                    <!-- Fiadores -->
                    <div class="section-header">
                        <h3>FIADORES</h3>
                        <button type="button" class="btn btn-secondary btn-sm" onclick="adicionarFiador()">
                            + Adicionar Fiador
                        </button>
                    </div>

                    <div id="fiadores-container"></div>

                    <!-- Dados do Proprietário -->
                    <div class="section-header">
                        <h3>DADOS DO PROPRIETÁRIO</h3>
                    </div>

                    <div class="row">
                        <div class="col-12">
                            <div class="form-group">
                                <label>Nome do Proprietário</label>
                                <input type="text" id="nomeProprietario" class="form-control" placeholder="Nome completo do proprietário">
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
                                <input type="text" id="enderecoImovel" class="form-control" placeholder="Endereço completo do imóvel">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12">
                            <div class="form-group">
                                <label>Características do Imóvel</label>
                                <textarea id="caracteristicasImovel" class="form-control" rows="3" placeholder="Ex: 3 quartos, 2 banheiros, garagem, área de serviço, etc."></textarea>
                            </div>
                        </div>
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
                                <input type="text" id="numeroMedidor" class="form-control" placeholder="Número do medidor">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>IPTU</label>
                                <input type="text" id="IPTUImovel" class="form-control" placeholder="Número do IPTU">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>Inscrição IPTU</label>
                                <input type="text" id="InscricaoIPTU" class="form-control" placeholder="Número de inscrição">
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
                                <label>Duração (meses)</label>
                                <input type="text" id="duracao" class="form-control" placeholder="Ex: 12 meses" >
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Data Início</label>
                                <input type="text" id="dataInicio" class="form-control" placeholder="DD/MM/AAAA" >
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Data Término (Automático)</label>
                                <input type="text" id="dataTermino" class="form-control" placeholder="Será calculado automaticamente" readonly>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-4">
                            <div class="form-group">
                                <label>Valor Mensal da Locação</label>
                                <input type="text" id="valorLocacaoMensal" class="form-control" placeholder="R$ 0,00">
                            </div>
                        </div>
                        
                        <div class="col-4">
                            <div class="form-group">
                                <label>Data do Contrato</label>
                                <input type="text" id="dataContrato" class="form-control" placeholder="Ex: 30 de novembro de 2025">
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
    
    // Configurar eventos para cálculo automático
    setTimeout(() => {
        const duracaoInput = document.getElementById('duracao');
        const dataInicioInput = document.getElementById('dataInicio');
        
        if (duracaoInput && dataInicioInput) {
            calcularDataTermino();
            duracaoInput.addEventListener('input', calcularDataTermino);
            dataInicioInput.addEventListener('input', calcularDataTermino);
        }
    }, 100);
    
    // Carregar dados do Pipefy
    await loadPipefyDataContrato();
}

// FUNÇÃO PARA CALCULAR DATA DE TÉRMINO
function calcularDataTermino() {
    const duracaoInput = document.getElementById('duracao');
    const dataInicioInput = document.getElementById('dataInicio');
    const dataTerminoInput = document.getElementById('dataTermino');
    
    if (!duracaoInput || !dataInicioInput || !dataTerminoInput) return;
    
    const duracao = duracaoInput.value.trim();
    const dataInicioStr = dataInicioInput.value.trim();
    
    if (!duracao || !dataInicioStr) {
        dataTerminoInput.value = "";
        return;
    }
    
    try {
        const mesesMatch = duracao.match(/(\d+)\s*mese?s?/i);
        if (!mesesMatch) {
            dataTerminoInput.value = "";
            return;
        }
        
        const meses = parseInt(mesesMatch[1]);
        const dataInicioObj = validarEConverterData(dataInicioStr);
        if (!dataInicioObj) {
            dataTerminoInput.value = "Data inválida";
            return;
        }
        
        const dataTerminoObj = new Date(dataInicioObj);
        dataTerminoObj.setMonth(dataTerminoObj.getMonth() + meses);
        dataTerminoObj.setDate(dataTerminoObj.getDate() - 1);
        
        const diaTermino = String(dataTerminoObj.getDate()).padStart(2, '0');
        const mesTermino = String(dataTerminoObj.getMonth() + 1).padStart(2, '0');
        const anoTermino = dataTerminoObj.getFullYear();
        
        dataTerminoInput.value = `${diaTermino}/${mesTermino}/${anoTermino}`;
        
    } catch (error) {
        console.error('Erro ao calcular data de término:', error);
        dataTerminoInput.value = "Erro no cálculo";
    }
}

// FUNÇÃO AUXILIAR PARA VALIDAR DATAS
function validarEConverterData(dataStr) {
    if (!dataStr) return null;
    
    try {
        const regexData = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        const match = dataStr.match(regexData);
        
        if (!match) return null;
        
        const dia = parseInt(match[1]);
        const mes = parseInt(match[2]) - 1;
        const ano = parseInt(match[3]);
        
        const data = new Date(ano, mes, dia);
        
        if (data.getDate() !== dia || data.getMonth() !== mes || data.getFullYear() !== ano) {
            return null;
        }
        
        return data;
    } catch (error) {
        console.error('Erro ao converter data:', error);
        return null;
    }
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
                        <label>Nome Completo</label>
                        <input type="text" id="fiadorNome${fiadoresCount}" class="form-control" placeholder="Nome completo">
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label>Nacionalidade</label>
                        <input type="text" id="fiadorNacionalidade${fiadoresCount}" class="form-control" placeholder="Ex: Brasileira" value="Brasileira">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-4">
                    <div class="form-group">
                        <label>Estado Civil</label>
                        <input type="text" id="fiadorEstadoCivil${fiadoresCount}" class="form-control" placeholder="Ex: Solteiro, Casado">
                    </div>
                </div>
                <div class="col-4">
                    <div class="form-group">
                        <label>Profissão</label>
                        <input type="text" id="fiadorProfissao${fiadoresCount}" class="form-control" placeholder="Profissão">
                    </div>
                </div>
                <div class="col-4">
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
                        <label>Endereço Completo</label>
                        <input type="text" id="fiadorEndereco${fiadoresCount}" class="form-control" placeholder="Endereço completo">
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

// FUNÇÃO PARA GERAR CONTRATO
async function gerarContratoLocacao() {
    console.log('🎯 Gerando contrato...');

    try {
        const dados = coletarDadosFormulario();

        const response = await fetch('/api/gerar-documento/contrato-locacao', {
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
    const getValue = (id) => {
        const element = document.getElementById(id);
        return element ? element.value : "";
    };

    const dados = {
        nomeLocatario: getValue('nomeLocatario'),
        nacionalidadeLocatario: getValue('nacionalidadeLocatario'),
        estadoCivilLocatario: getValue('estadoCivilLocatario'),
        profissaoLocatario: getValue('profissaoLocatario'),
        RGLocatario: getValue('RGLocatario'),
        CPFLocatario: getValue('CPFLocatario'),
        enderecoLocatario: getValue('enderecoLocatario'),
        nomeProprietario: getValue('nomeProprietario'),
        tipoDoImovel: getValue('tipoDoImovel'),
        enderecoImovel: getValue('enderecoImovel'),
        caracteristicasImovel: getValue('caracteristicasImovel'),
        matriculaCopasa: getValue('matriculaCopasa'),
        hidrometroCopasa: getValue('hidrometroCopasa'),
        CemigInstalacao: getValue('CemigInstalacao'),
        numeroMedidor: getValue('numeroMedidor'),
        IPTUImovel: getValue('IPTUImovel'),
        InscricaoIPTU: getValue('InscricaoIPTU'),
        duracao: getValue('duracao'),
        dataInicio: getValue('dataInicio'),
        dataTermino: getValue('dataTermino'),
        valorLocacaoMensal: getValue('valorLocacaoMensal'),
        dataContrato: getValue('dataContrato'),
        fiadores: []
    };

    // Coletar fiadores
    for (let i = 1; i < fiadoresCount; i++) {
        const nomeFiador = getValue(`fiadorNome${i}`);
        
        if (nomeFiador && nomeFiador.trim() !== "") {
            const fiadorObj = {
                nomeFiador: nomeFiador,
                nacionalidadeFiador: getValue(`fiadorNacionalidade${i}`) || "Brasileira",
                estadoCivilFiador: getValue(`fiadorEstadoCivil${i}`) || "",
                profissaoFiador: getValue(`fiadorProfissao${i}`) || "",
                RGFiador: getValue(`fiadorRG${i}`) || "",
                CPFFiador: getValue(`fiadorCPF${i}`) || "",
                enderecoFiador: getValue(`fiadorEndereco${i}`) || "",
            };
            
            dados.fiadores.push(fiadorObj);
        }
    }

    return dados;
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

// MAPEAMENTO PERSONALIZADO PIPEFY -> FORMULÁRIO LOCAÇÃO
function getPipefyFieldMappingsLocacao() {
    return {
        // Dados do Locatário
        'nomeLocatario': 'nomeLocatario',
        'RGLocatario': 'RGLocatario',
        'CPFLocatario': 'CPFLocatario',
        'nacionalidadeLocatario': 'nacionalidadeLocatario',
        'estadoCivilLocatario': 'estadoCivilLocatario',
        'profissaoLocatario': 'profissaoLocatario',
        'enderecoLocatario': 'enderecoLocatario',
        
        // Dados do Proprietário
        'nomeProprietario': 'nomeProprietario',
        
        // Dados do Imóvel
        'tipoDoImovel': 'tipoDoImovel',
        'enderecoImovel': 'enderecoImovel',
        'caracteristicasImovel': 'caracteristicasImovel',
        
        // Serviços e Tributos
        'matriculaCopasa': 'matriculaCopasa',
        'hidrometroCopasa': 'hidrometroCopasa',
        'CemigInstalacao': 'CemigInstalacao',
        'numeroMedidor': 'numeroMedidor',
        'IPTUImovel': 'IPTUImovel',
        'InscricaoIPTU': 'InscricaoIPTU',
        
        // Duração do Contrato
        'duracao': 'duracao',
        'dataInicio': 'dataInicio',
        'dataTermino': 'dataTermino',
        'valorLocacaoMensal': 'valorLocacaoMensal',
        'dataContrato': 'dataContrato'
    };
}

// FUNÇÃO PARA PREENCHER FORMULÁRIO
function fillContratoFormWithCardData(cardData) {
    console.log('🎯 Preenchendo contrato locação com dados do Pipefy...');
    
    const dados = cardData.dadosPreenchidos;
    const mappings = getPipefyFieldMappingsLocacao();
    let camposPreenchidos = 0;

    Object.keys(mappings).forEach(campoPipefy => {
        const campoFormulario = mappings[campoPipefy];
        const valor = dados[campoPipefy];
        
        if (valor && valor !== "" && valor !== "undefined" && valor !== "null") {
            const input = document.getElementById(campoFormulario);
            if (input) {
                input.value = valor;
                camposPreenchidos++;
                
                // Feedback visual
                input.style.backgroundColor = '#e8f5e8';
                setTimeout(() => { 
                    input.style.backgroundColor = ''; 
                }, 2000);
            }
        }
    });

    console.log(`🎉 ${camposPreenchidos} campos preenchidos automaticamente`);
    
    if (camposPreenchidos > 0 && window.app && window.app.showAlert) {
        window.app.showAlert(`${camposPreenchidos} campos preenchidos automaticamente!`, 'success');
    }
    
    return camposPreenchidos;
}