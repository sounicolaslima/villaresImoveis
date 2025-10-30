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
                                <input type="text" id="estadoCivilProprietario" class="form-control" placeholder="Solteiro, Casado, etc.">
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
                        <input type="text" id="enderecoImovel" class="form-control" placeholder="Endereço completo do imóvel">
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
                                <input type="text" id="dataAluguel" class="form-control" placeholder="Ex: 05 (cinco)" >
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>Data Início</label>
                                <input type="text" id="dataInicioContrato" class="form-control" placeholder="DD/MM/AAAA" >
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>Valor do Aluguel</label>
                                <input type="text" id="valorLocacaoMensal" class="form-control" placeholder="R$ 0,00 (valor por extenso)">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>Data do Contrato</label>
                                <input type="text" id="dataContrato" class="form-control" placeholder="Dia, Mês de Ano" >
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
    // Função para pegar o valor ATUAL do campo (seja do Pipefy ou manual)
    const getValue = (id) => {
        const element = document.getElementById(id);
        return element ? element.value : "";
    };

    return {
        // Dados do Proprietário
        nomeProprietario: getValue('nomeProprietario'),
        RGProprietario: getValue('RGProprietario'),
        CPFProprietario: getValue('CPFProprietario'),
        profissaoProprietario: getValue('profissaoProprietario'),
        estadoCivilProprietario: getValue('estadoCivilProprietario'),
        enderecoProprietario: getValue('enderecoProprietario'),
        celProprietario: getValue('celProprietario'),
        emailProprietario: getValue('emailProprietario'),

        // Dados Bancários
        banco: getValue('banco'),
        agencia: getValue('agencia'),
        conta: getValue('conta'),
        declaracaoImposto: getValue('declaracaoImposto'),

        // Dados do Imóvel
        enderecoImovel: getValue('enderecoImovel'),
        caracteristicasImovel: getValue('caracteristicasImovel'),

        // Serviços
        matriculaCopasa: getValue('matriculaCopasa'),
        hidrometro: getValue('hidrometroCopasa'),
        CemigInstalacao: getValue('CemigInstalacao'),
        numeroMedidor: getValue('numeroMedidor'),
        IPTUImovel: getValue('IPTUImovel'),
        InscricaoIPTU: getValue('InscricaoIPTU'),

        // Dados do Contrato
        dataAluguel: getValue('dataAluguel'),
        dataInicioContrato: getValue('dataInicioContrato'),
        valorAluguel: getValue('valorLocacaoMensal'),
        dataContrato: getValue('dataContrato'),

        // Testemunhas
        nomeTestemunha1: getValue('nomeTestemunha1'),
        CPFTestemunha1: getValue('CPFTestemunha1'),
        nomeTestemunha2: getValue('nomeTestemunha2'),
        CPFTestemunha2: getValue('CPFTestemunha2')
    };
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

// MAPEAMENTO PERSONALIZADO PIPEFY -> FORMULÁRIO ADMINISTRAÇÃO
function getPipefyFieldMappingsAdmin() {
    return {
        // Dados do Proprietário
        'nomeProprietario': 'nomeProprietario',
        'RGProprietario': 'RGProprietario',
        'CPFProprietario': 'CPFProprietario', 
        'enderecoProprietario': 'enderecoProprietario',
        'profissaoProprietario': 'profissaoProprietario',
        'estadoCivilProprietario': 'estadoCivilProprietario',
        'celProprietario': 'celProprietario',
        'emailProprietario': 'emailProprietario',
        
        // Dados Bancários
        'banco': 'banco',
        'agencia': 'agencia',
        'conta': 'conta',
        'pix': 'pix',
        'valorAluguel': 'valorLocacaoMensal',
        
        // Serviços - CORRIGIDOS
        'CemigInstalacao': 'CemigInstalacao', 
        'matriculaCopasa': 'matriculaCopasa',
        'hidrometroCopasa': 'hidrometroCopasa',
        'numeroMedidor': 'numeroMedidor',
        'enderecoImovel': 'enderecoImovel',
        'IPTUImovel': 'IPTUImovel', 
        
    };
}
// DEBUG COMPLETO - adicione esta função
function debugCompletePipefyData(cardData) {
    console.log('=== 🐛 DEBUG COMPLETO - ANALISANDO DADOS PIPEFY ===');
    
    const dados = cardData.dadosPreenchidos;
    
    // 1. Mostrar TODOS os campos disponíveis
    console.log('📋 TODOS OS CAMPOS DISPONÍVEIS:');
    Object.keys(dados).forEach((campo, index) => {
        console.log(`   ${index + 1}. "${campo}" = "${dados[campo]}"`);
    });
    
    // 2. Procurar por campos relacionados a estado civil
    console.log('🔍 PROCURANDO CAMPOS DE ESTADO CIVIL:');
    const camposEstadoCivil = Object.keys(dados).filter(campo => 
        campo.toLowerCase().includes('estado') || 
        campo.toLowerCase().includes('civil') ||
        campo.toLowerCase().includes('estadocivil')
    );
    camposEstadoCivil.forEach(campo => {
        console.log(`   ✅ Encontrado: "${campo}" = "${dados[campo]}"`);
    });
    
    // 3. Procurar por campos relacionados a profissão
    console.log('🔍 PROCURANDO CAMPOS DE PROFISSÃO:');
    const camposProfissao = Object.keys(dados).filter(campo => 
        campo.toLowerCase().includes('profiss') || 
        campo.toLowerCase().includes('ocupacao') ||
        campo.toLowerCase().includes('profissao')
    );
    camposProfissao.forEach(campo => {
        console.log(`   ✅ Encontrado: "${campo}" = "${dados[campo]}"`);
    });
    
    // 4. Verificar mapeamento atual
    console.log('🔍 MAPEAMENTO ATUAL:');
    const mappings = getPipefyFieldMappingsAdmin();
    Object.keys(mappings).forEach(key => {
        if (key.includes('Estado Civil') || key.includes('Profissão')) {
            console.log(`   📍 "${key}" -> "${mappings[key]}"`);
        }
    });
    
    // 5. Verificar se os inputs existem no DOM
    console.log('🔍 VERIFICANDO INPUTS NO DOM:');
    const inputEstadoCivil = document.getElementById('estadoCivilProprietario');
    const inputProfissao = document.getElementById('profissaoProprietario');
    console.log(`   Input estadoCivilProprietario: ${inputEstadoCivil ? 'EXISTE' : 'NÃO EXISTE'}`);
    console.log(`   Input profissaoProprietario: ${inputProfissao ? 'EXISTE' : 'NÃO EXISTE'}`);
    
    console.log('=== FIM DEBUG ===');
}

// MODIFIQUE a função fillAdminFormWithCardData para usar o debug:
function fillAdminFormWithCardData(cardData) {
    console.log('🎯 Preenchendo contrato administração com dados do Pipefy...');
    
    // EXECUTAR DEBUG COMPLETO
    debugCompletePipefyData(cardData);
    
    const dados = cardData.dadosPreenchidos;
    const mappings = getPipefyFieldMappingsAdmin();
    let camposPreenchidos = 0;

    // Tentativa 1: Preenchimento por mapeamento
    Object.keys(dados).forEach(campoPipefy => {
        const valor = dados[campoPipefy];
        
        if (!valor || valor === "" || valor === "undefined" || valor === "null") {
            return;
        }

        const campoFormulario = mappings[campoPipefy];
        if (campoFormulario) {
            const input = document.getElementById(campoFormulario);
            if (input) {
                input.value = valor;
                camposPreenchidos++;
                console.log(`✅ MAPEADO: "${campoPipefy}" -> "${campoFormulario}": "${valor}"`);
            }
        }
    });

    // Tentativa 2: Preenchimento direto (fallback)
    Object.keys(dados).forEach(campoPipefy => {
        const valor = dados[campoPipefy];
        const inputDireto = document.getElementById(campoPipefy);
        
        if (inputDireto && valor && valor !== "" && valor !== "undefined" && valor !== "null") {
            inputDireto.value = valor;
            camposPreenchidos++;
            console.log(`✅ DIRETO: "${campoPipefy}": "${valor}"`);
        }
    });

    // Tentativa 3: Busca por similaridade (último recurso)
    const camposCriticos = {
        'estadoCivilProprietario': ['estado', 'civil', 'estadocivil'],
        'profissaoProprietario': ['profiss', 'ocupacao', 'trabalho']
    };

    Object.keys(camposCriticos).forEach(campoForm => {
        const input = document.getElementById(campoForm);
        if (input && !input.value) {
            const keywords = camposCriticos[campoForm];
            
            Object.keys(dados).forEach(campoPipefy => {
                const valor = dados[campoPipefy];
                if (valor && keywords.some(keyword => campoPipefy.toLowerCase().includes(keyword))) {
                    input.value = valor;
                    camposPreenchidos++;
                    console.log(`🎉 SIMILARIDADE: "${campoPipefy}" -> "${campoForm}": "${valor}"`);
                }
            });
        }
    });

    console.log(`🎉 Total: ${camposPreenchidos} campos preenchidos`);
    
    // Verificação final
    console.log('📊 VERIFICAÇÃO FINAL:');
    console.log(`   Estado Civil: "${document.getElementById('estadoCivilProprietario').value}"`);
    console.log(`   Profissão: "${document.getElementById('profissaoProprietario').value}"`);
    
    return camposPreenchidos;
}
// SUBSTITUA A FUNÇÃO fillAdminFormWithCardData POR ESTA:
function fillAdminFormWithCardData(cardData) {
    console.log('🎯 Preenchendo contrato administração com dados do Pipefy...');
    
    const dados = cardData.dadosPreenchidos;
    const mappings = getPipefyFieldMappingsAdmin(); // USE O MAPEAMENTO
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