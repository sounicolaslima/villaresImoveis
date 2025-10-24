//===========================================================
// CONTRATO DE ADMINISTRAÇÃO - CORRIGIDO
//===========================================================
async function loadContratoAdministracaoPage() {
    console.log('Carregando página de contrato de administração...');

    const content = document.getElementById('page-content');
    if (!content) {
        console.error('Elemento page-content não encontrado!');
        return;
    }

    content.innerHTML = `
        <div class="page-container">
            <div class="page-header">
                <button class="btn btn-secondary" onclick="goBack()">← VOLTAR</button>
                <h1>📋 CONTRATO DE ADMINISTRAÇÃO</h1>
                <div id="pipefy-selector"></div>
            </div>

            <div class="main-container">
                <div id="loading" class="alert alert-info">Carregando dados do Pipefy...</div>

                <form id="contrato-administracao-form">
                    <!-- Dados do Proprietário -->
                    <div class="section-header">
                        <h3>DADOS DO PROPRIETÁRIO</h3>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>Nome</label>
                                <input type="text" id="nomeProprietario" class="form-control" placeholder="Nome completo do proprietário">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>RG</label>
                                <input type="text" id="RGProprietario" class="form-control" placeholder="0000000">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>CPF</label>
                                <input type="text" id="CPFProprietario" class="form-control" placeholder="000.000.000-00">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>Profissão</label>
                                <input type="text" id="profissaoProprietario" class="form-control" placeholder="Profissão do proprietário">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>Estado Civil</label>
                                <input type="text" id="estadoCivil" class="form-control" placeholder="Solteiro, Casado, etc.">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>Endereço</label>
                                <input type="text" id="enderecoProprietario" class="form-control" placeholder="Endereço completo">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>Celular</label>
                                <input type="text" id="celProprietario" class="form-control" placeholder="(00) 00000-0000">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>E-mail</label>
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

                    <!-- Imóvel -->
                    <div class="section-header">
                        <h3>IMÓVEL OBJETO DA ADMINISTRAÇÃO</h3>
                    </div>

                    <div class="form-group">
                        <input type="text" id="EnderecoImovel" class="form-control" placeholder="Endereço completo do imóvel">
                    </div>

                    <!-- Características do Imóvel -->
                    <div class="section-header">
                        <h3>CARACTERÍSTICAS DO IMÓVEL</h3>
                    </div>

                    <div class="form-group">
                        <textarea id="caracteristicasImovel" class="form-control" rows="3" placeholder="Ex: 3 quartos, 2 banheiros, garagem, área de serviço, piscina, etc."></textarea>
                    </div>

                    <!-- Serviços e Tributos -->
                    <div class="section-header">
                        <h3>SERVIÇOS E TRIBUTOS</h3>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>COPASA Matrícula</label>
                                <input type="text" id="matriculaCopasa" class="form-control" placeholder="Número da matrícula">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>N° Hidrómetro</label>
                                <input type="text" id="hidrometro" class="form-control" placeholder="Número do hidrômetro">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>CEMIG Instalação</label>
                                <input type="text" id="cemigInstal" class="form-control" placeholder="Número da instalação">
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
                                <label>IPTU Imóvel</label>
                                <input type="text" id="IPTUImovel" class="form-control" placeholder="IPTU">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>Inscrição Cadastral</label>
                                <input type="text" id="InscricaoIPTU" class="form-control" placeholder="Número de inscrição">
                            </div>
                        </div>
                    </div>

                    <!-- Dados do Contrato -->
                    <div class="section-header">
                        <h3>DADOS DO CONTRATO</h3>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>Dia do Pagamento</label>
                                <input type="text" id="dataAluguel" class="form-control" placeholder="Ex: 05 (cinco)" value="05">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>Data Início</label>
                                <input type="text" id="dataInicioContrato" class="form-control" placeholder="DD/MM/AAAA" value="${new Date().toLocaleDateString('pt-BR')}">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>Valor do Aluguel</label>
                                <input type="text" id="valorAluguel" class="form-control" placeholder="R$ 0,00 (valor por extenso)">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>Data do Contrato</label>
                                <input type="text" id="dataContrato" class="form-control" placeholder="Dia, Mês de Ano" value="${formatarDataContrato()}">
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
                                <label>Nome Testemunha 1</label>
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
                                <label>Nome Testemunha 2</label>
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

                    <!-- Botão de gerar documento -->
                    <div class="row mt-3">
                        <div class="col-12 text-center">
                            <button type="button" class="btn btn-primary btn-block" onclick="gerarContratoAdministracao()">
                                📋 GERAR CONTRATO DE ADMINISTRAÇÃO
                            </button>
                        </div>
                    </div>
                </form>

                <div id="download-section-admin" class="hidden mt-3">
                    <div class="alert alert-success text-center">
                        ✅ Contrato gerado com sucesso!
                    </div>
                    <button id="download-btn-admin" class="btn btn-primary btn-block">
                        📥 BAIXAR CONTRATO
                    </button>
                </div>
            </div>
        </div>
    `;

    await loadPipefyDataAdmin();
}

// FUNÇÃO PARA FORMATAR DATA DO CONTRATO
function formatarDataContrato() {
    const data = new Date();
    const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };
    return data.toLocaleDateString('pt-BR', options);
}

// FUNÇÃO PARA GERAR CONTRATO DE ADMINISTRAÇÃO
async function gerarContratoAdministracao() {
    console.log('Gerando contrato de administração...');

    try {
        const dados = coletarDadosAdministracaoFormulario();

        if (!validarDadosAdministracao(dados)) {
            if (window.app && window.app.showAlert) {
                window.app.showAlert('Por favor, preencha todos os campos obrigatórios!', 'error');
            }
            return;
        }

        console.log('Dados coletados:', dados);

        const response = await fetch('/api/gerar-documento/contrato-administracao', {
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

        const downloadBtn = document.getElementById('download-btn-admin');
        if (downloadBtn) {
            downloadBtn.onclick = () => {
                const a = document.createElement('a');
                a.href = url;
                a.download = `Contrato_Administracao_${dados.nomeProprietario.replace(/\s+/g, '_')}.docx`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            };
        }

        const downloadSection = document.getElementById('download-section-admin');
        if (downloadSection) {
            downloadSection.classList.remove("hidden");
        }

        if (window.app && window.app.showAlert) {
            window.app.showAlert('Contrato de administração gerado com sucesso!', 'success');
        }

    } catch (error) {
        console.error('❌ Erro ao gerar contrato:', error);
        if (window.app && window.app.showAlert) {
            window.app.showAlert(`Erro ao gerar contrato: ${error.message}`, 'error');
        }
    }
}

// FUNÇÃO PARA COLETAR DADOS DO FORMULÁRIO ADMINISTRAÇÃO
function coletarDadosAdministracaoFormulario() {
    return {
        // Dados do Proprietário
        nomeProprietario: document.getElementById('nomeProprietario').value,
        RGProprietario: document.getElementById('RGProprietario').value,
        CPFProprietario: document.getElementById('CPFProprietario').value,
        profissaoProprietario: document.getElementById('profissaoProprietario').value,
        estadoCivil: document.getElementById('estadoCivil').value,
        enderecoProprietario: document.getElementById('enderecoProprietario').value,
        celProprietario: document.getElementById('celProprietario').value,
        emailProprietario: document.getElementById('emailProprietario').value,

        // Dados Bancários
        banco: document.getElementById('banco').value,
        agencia: document.getElementById('agencia').value,
        conta: document.getElementById('conta').value,
        declaracaoImposto: document.getElementById('declaracaoImposto').value,

        // Dados do Imóvel
        EnderecoImovel: document.getElementById('EnderecoImovel').value,
        caracteristicasImovel: document.getElementById('caracteristicasImovel').value,

        // Serviços
        matriculaCopasa: document.getElementById('matriculaCopasa').value,
        hidrometro: document.getElementById('hidrometro').value,
        cemigInstal: document.getElementById('cemigInstal').value,
        numeroMedidor: document.getElementById('numeroMedidor').value,
        IPTUImovel: document.getElementById('IPTUImovel').value,
        InscricaoIPTU: document.getElementById('InscricaoIPTU').value,

        // Dados do Contrato
        dataAluguel: document.getElementById('dataAluguel').value,
        dataInicioContrato: document.getElementById('dataInicioContrato').value,
        valorAluguel: document.getElementById('valorAluguel').value,
        dataContrato: document.getElementById('dataContrato').value,

        // Testemunhas
        nomeTestemunha1: document.getElementById('nomeTestemunha1').value,
        CPFTestemunha1: document.getElementById('CPFTestemunha1').value,
        nomeTestemunha2: document.getElementById('nomeTestemunha2').value,
        CPFTestemunha2: document.getElementById('CPFTestemunha2').value
    };
}

// FUNÇÃO PARA VALIDAR DADOS ADMINISTRAÇÃO
function validarDadosAdministracao(dados) {
    const camposObrigatorios = [
        'nomeProprietario', 'CPFProprietario', 'enderecoProprietario',
        'EnderecoImovel', 'dataInicioContrato', 'valorAluguel'
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
async function loadPipefyDataAdmin() {
    try {
        const loading = document.getElementById('loading');
        const cards = await window.app.loadPipefyCards();

        if (loading) loading.classList.add('hidden');

        if (cards.length > 0) {
            const selectorContainer = document.getElementById('pipefy-selector');
            if (selectorContainer) {
                const selector = window.app.createCardSelector(cards, (card) => {
                    fillAdminFormWithCardData(card);
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
function fillAdminFormWithCardData(cardData) {
    console.log('🎯 Preenchendo contrato administração com dados do Pipefy...');
    
    const dados = cardData.dadosPreenchidos;
    let camposPreenchidos = 0;

    Object.keys(dados).forEach(campo => {
        const valor = dados[campo];
        const input = document.getElementById(campo);
        
        if (input && valor && valor !== "") {
            input.value = valor;
            camposPreenchidos++;
            console.log(`✅ ${campo}: ${valor}`);
        }
    });

    console.log(`🎉 ${camposPreenchidos} campos preenchidos no admin`);
    
    if (camposPreenchidos > 0 && window.app && window.app.showAlert) {
        window.app.showAlert(`${camposPreenchidos} campos preenchidos automaticamente!`, 'success');
    }
    
    return camposPreenchidos;
}
