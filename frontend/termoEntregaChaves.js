//===========================================================
// TERMO DE ENTREGA DE CHAVES - INÍCIO DE LOCAÇÃO
//===========================================================

let itensEntreguesCount = 1;

async function loadTermoEntregaChavesPage() {
    console.log('Carregando página de termo de entrega de chaves...');

    const content = document.getElementById('page-content');
    if (!content) {
        console.error('Elemento page-content não encontrado!');
        return;
    }

    content.innerHTML = `
        <div class="page-container">
            <div class="page-header">
                <button class="btn btn-secondary" onclick="goBack()">← VOLTAR</button>
                <h1>🔑 TERMO DE ENTREGA DE CHAVES</h1>
                <div id="pipefy-selector"></div>
            </div>

            <div class="main-container">
                <div id="loading" class="alert alert-info">Carregando dados do Pipefy...</div>

                <form id="termo-entrega-chaves-form">
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
                        <div class="col-6">
                            <div class="form-group">
                                <label>Nacionalidade</label>
                                <input type="text" id="nacionalidadeLocatario" class="form-control" placeholder="Ex: Brasileira" value="Brasileira">
                            </div>
                        </div>
                    </div>

                    <div class="row">
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
                        <div class="col-4">
                            <div class="form-group">
                                <label>RG</label>
                                <input type="text" id="RGLocatario" class="form-control" placeholder="00.000.000-0">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>CPF</label>
                                <input type="text" id="CPFLocatario" class="form-control" placeholder="000.000.000-00">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>Endereço do Imóvel</label>
                                <input type="text" id="enderecoImovel" class="form-control" placeholder="Endereço completo do imóvel locado">
                            </div>
                        </div>
                    </div>

                    <!-- Itens Entregues -->
                    <div class="section-header">
                        <h3>ITENS ENTREGUES</h3>
                        <button type="button" class="btn btn-secondary btn-sm" onclick="adicionarItem()">
                            + Adicionar Item
                        </button>
                    </div>

                    <div id="itens-entregues-container"></div>

                    <!-- Data do Termo -->
                    <div class="section-header">
                        <h3>DATA DO TERMO</h3>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>Data do Termo</label>
                                <input type="text" id="data" class="form-control" placeholder="Ex: 15 de dezembro de 2024)">
                            </div>
                        </div>
                    </div>

                    <!-- Botão de gerar documento -->
                    <div class="row mt-3">
                        <div class="col-12 text-center">
                            <button type="button" class="btn btn-primary btn-block" onclick="gerarTermoEntregaChaves()">
                                🔑 GERAR TERMO DE ENTREGA DE CHAVES
                            </button>
                        </div>
                    </div>
                </form>

                <div id="download-section-termo" class="hidden mt-3">
                    <div class="alert alert-success text-center">
                        ✅ Termo de entrega de chaves gerado com sucesso!
                    </div>
                    <button id="download-btn-termo" class="btn btn-primary btn-block">
                        📥 BAIXAR TERMO
                    </button>
                </div>
            </div>
        </div>
    `;

    // Inicializar itens
    itensEntreguesCount = 1;
    adicionarItem();
    
    // Carregar dados do Pipefy
    await loadPipefyDataTermo();
}

// FUNÇÃO PARA ADICIONAR ITEM
function adicionarItem() {
    const container = document.getElementById('itens-entregues-container');
    const itemHTML = `
        <div class="item-entregue-item mb-2" id="item-${itensEntreguesCount}">
            <div class="input-group">
                <input type="text" id="itensEntregues${itensEntreguesCount}" class="form-control" placeholder="Ex: 02 chaves do portão, 01 chave da porta frontal, 01 controle do portão eletrônico">
                <div class="input-group-append">
                    <button type="button" class="btn btn-danger" onclick="removerItem(${itensEntreguesCount})">×</button>
                </div>
            </div>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', itemHTML);
    itensEntreguesCount++;
}

// FUNÇÃO PARA REMOVER ITEM
function removerItem(id) {
    const itemElement = document.getElementById(`item-${id}`);
    if (itemElement) {
        itemElement.remove();
    }
}

// FUNÇÃO PARA GERAR TERMO
async function gerarTermoEntregaChaves() {
    console.log('🔑 Gerando termo de entrega de chaves...');

    try {
        const dados = coletarDadosTermoFormulario();

        console.log('Dados coletados:', dados);

        const response = await fetch('/api/gerar-documento/termoEntregaChaves', {
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

        const downloadBtn = document.getElementById('download-btn-termo');
        if (downloadBtn) {
            downloadBtn.onclick = () => {
                const a = document.createElement('a');
                a.href = url;
                a.download = `Termo_Entrega_Chaves_${dados.nomeLocatario || 'Sem_Nome'}.docx`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            };
        }

        const downloadSection = document.getElementById('download-section-termo');
        if (downloadSection) {
            downloadSection.classList.remove("hidden");
        }

        if (window.app && window.app.showAlert) {
            window.app.showAlert('Termo de entrega de chaves gerado com sucesso!', 'success');
        }

    } catch (error) {
        console.error('❌ Erro ao gerar termo:', error);
        if (window.app && window.app.showAlert) {
            window.app.showAlert(`Erro ao gerar termo: ${error.message}`, 'error');
        }
    }
}

// FUNÇÃO PARA COLETAR DADOS DO FORMULÁRIO
function coletarDadosTermoFormulario() {
    const getValue = (id) => {
        const element = document.getElementById(id);
        return element ? element.value : "";
    };

    const dados = {
        // Dados do Proprietário
        nomeProprietario: getValue('nomeProprietario'),
        
        // Dados do Locatário
        nomeLocatario: getValue('nomeLocatario'),
        nacionalidadeLocatario: getValue('nacionalidadeLocatario'),
        estadoCivilLocatario: getValue('estadoCivilLocatario'),
        profissaoLocatario: getValue('profissaoLocatario'),
        RGLocatario: getValue('RGLocatario'),
        CPFLocatario: getValue('CPFLocatario'),
        enderecoImovel: getValue('enderecoImovel'),
        
        // Itens Entregues
        itensEntregues: [],
        
        // Data
        data: getValue('data')
    };

    // Coletar itens entregues
    for (let i = 1; i < itensEntreguesCount; i++) {
        const item = getValue(`itensEntregues${i}`);
        if (item && item.trim() !== "") {
            dados.itensEntregues.push(item.trim());
        }
    }

    return dados;
}

// CARREGAR DADOS DO PIPEFY
async function loadPipefyDataTermo() {
    try {
        const loading = document.getElementById('loading');
        const cards = await window.app.loadPipefyCards();

        if (loading) loading.classList.add('hidden');

        if (cards.length > 0) {
            const selectorContainer = document.getElementById('pipefy-selector');
            if (selectorContainer) {
                const selector = window.app.createCardSelector(cards, (card) => {
                    fillTermoFormWithCardData(card);
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

// MAPEAMENTO PERSONALIZADO PIPEFY -> FORMULÁRIO TERMO
function getPipefyFieldMappingsTermo() {
    return {
        // Dados do Proprietário
        'nomeProprietario': 'nomeProprietario',
        
        // Dados do Locatário
        'nomeLocatario': 'nomeLocatario',
        'nacionalidadeLocatario': 'nacionalidadeLocatario',
        'estadoCivilLocatario': 'estadoCivilLocatario',
        'profissaoLocatario': 'profissaoLocatario',
        'RGLocatario': 'RGLocatario',
        'CPFLocatario': 'CPFLocatario',
        'enderecoImovel': 'enderecoImovel',
        
        // Data
        'data': 'data'
    };
}

// FUNÇÃO PARA PREENCHER FORMULÁRIO COM DADOS DO PIPEFY
function fillTermoFormWithCardData(cardData) {
    console.log('🎯 Preenchendo termo de entrega de chaves com dados do Pipefy...');
    
    const dados = cardData.dadosPreenchidos;
    const mappings = getPipefyFieldMappingsTermo();
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
                
                // Feedback visual
                input.style.backgroundColor = '#e8f5e8';
                setTimeout(() => { 
                    input.style.backgroundColor = ''; 
                }, 2000);
            }
        }
        
        // 2. Também tentar preenchimento direto (para compatibilidade)
        const inputDireto = document.getElementById(campoPipefy);
        if (inputDireto && valor && valor !== "" && valor !== "undefined" && valor !== "null") {
            inputDireto.value = valor;
            camposPreenchidos++;
            console.log(`✅ ${campoPipefy}: ${valor}`);
            
            // Feedback visual
            inputDireto.style.backgroundColor = '#e8f5e8';
            setTimeout(() => { 
                inputDireto.style.backgroundColor = ''; 
            }, 2000);
        }
    });

    console.log(`🎉 ${camposPreenchidos} campos preenchidos automaticamente`);
    
    if (camposPreenchidos > 0 && window.app && window.app.showAlert) {
        window.app.showAlert(`${camposPreenchidos} campos preenchidos automaticamente!`, 'success');
    }
    
    return camposPreenchidos;
}