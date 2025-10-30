//==========================================================
// TERMO DE VISTORIA - CÓDIGO COMPLETO E FUNCIONAL
//==========================================================

let fiadoresVistoriaCount = 1;
let comodosCount = 0;
let termosSalvos = JSON.parse(localStorage.getItem('termosVistoriaSalvos')) || [];

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
                                <input type="text" id="dataContrato" class="form-control" placeholder="DD/MM/AAAA" >
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Data da Vistoria</label>
                                <input type="text" id="dataVistoria" class="form-control" placeholder="DD/MM/AAAA" >
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

                    <div id="comodos-container"></div>

                    <!-- Botão de adicionar cômodo NOVO - AGORA NO FINAL -->
                    <div class="row mt-3">  
                        <div class="col-6">  
                            <button type="button" class="btn btn-secondary btn-block" onclick="adicionarComodo()">  
                                + Adicionar Cômodo  
                            </button>  
                        </div>  
                    </div>

                    <!-- Botões de ação -->  
                    <div class="row mt-4">  
                        <div class="col-3">
                            <button type="button" class="btn btn-info btn-block" onclick="visualizarDadosPreenchidos()">
                                👁️ VISUALIZAR DADOS
                            </button>
                        </div>
                        <div class="col-3">
                            <button type="button" class="btn btn-success btn-block" onclick="salvarTermoVistoria()">
                                💾 SALVAR VISTORIA
                            </button>
                        </div>
                        <div class="col-6">  
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

                <!-- Seção de termos salvos -->
                <div class="section-header mt-5">
                    <h3>📋 TERMOS DE VISTORIA SALVOS</h3>
                </div>

                <div class="row mb-3">
                    <div class="col-12">
                        <div class="form-group">
                            <input type="text" id="filtro-termos" class="form-control" placeholder="🔍 Buscar por nome do locatário..." onkeyup="filtrarTermosSalvos()">
                        </div>
                    </div>
                </div>

                <div id="lista-termos-salvos" class="mt-3">
                    <!-- Lista de termos salvos será carregada aqui -->
                </div>
            </div>  
        </div>

        <!-- Modal para visualizar dados -->
        <div class="modal fade" id="modalVisualizarDados" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">👁️ DADOS PREENCHIDOS - VISUALIZAÇÃO</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div id="dados-visualizacao"></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Inicializar  
    fiadoresVistoriaCount = 1;
    comodosCount = 0;
    adicionarFiadorVistoria();
    adicionarComodo();
    carregarListaTermosSalvos();

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
            <div class="row align-items-center">
                <div class="col-10">
                    <h4 class="comodo-titulo mb-0">
                        <span class="comodo-icone">🚪</span>
                        <span class="comodo-nome">Cômodo ${comodosCount}</span>
                    </h4>
                </div>
                <div class="col-2 text-end">
                    <button type="button" class="btn btn-sm btn-outline-secondary me-1" onclick="toggleComodo(${comodosCount})">
                        <span class="comodo-toggle-icon">−</span>
                    </button>
                    <button type="button" class="btn btn-sm btn-danger" onclick="removerComodo(${comodosCount})">×</button>
                </div>
            </div>
            
            <div class="comodo-conteudo" id="comodo-conteudo-${comodosCount}">
                <div class="form-group mt-3">
                    <label>Nome do Cômodo</label>
                    <input type="text" id="comodoNome${comodosCount}" class="form-control" placeholder="Ex: Sala, Quarto, Cozinha, Banheiro" onchange="atualizarNomeComodo(${comodosCount})">
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
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', comodoHTML);
    adicionarCaracteristicaComodo(comodosCount);
}

// FUNÇÃO PARA ATUALIZAR NOME DO CÔMODO NO TÍTULO
function atualizarNomeComodo(comodoId) {
    const input = document.getElementById(`comodoNome${comodoId}`);
    const nomeSpan = document.querySelector(`#comodo-${comodoId} .comodo-nome`);
    if (input && nomeSpan) {
        const nome = input.value.trim() || `Cômodo ${comodoId}`;
        nomeSpan.textContent = nome;
    }
}

// FUNÇÃO PARA MINIMIZAR/EXPANDIR CÔMODO
function toggleComodo(comodoId) {
    const conteudo = document.getElementById(`comodo-conteudo-${comodoId}`);
    const toggleIcon = document.querySelector(`#comodo-${comodoId} .comodo-toggle-icon`);
    
    if (conteudo && toggleIcon) {
        if (conteudo.style.display === 'none') {
            conteudo.style.display = 'block';
            toggleIcon.textContent = '−';
        } else {
            conteudo.style.display = 'none';
            toggleIcon.textContent = '+';
        }
    }
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
        <div class="row mt-3 align-items-start" id="carac-comodo-${comodoIndex}-${caracteristicasCount}">
            <div class="col-3">
                <div class="form-group">
                    <label>Item</label>
                    <input type="text" id="comodo${comodoIndex}carac${caracteristicasCount}nome" class="form-control" placeholder="Ex: Piso, Parede, Tomada">
                </div>
            </div>
            <div class="col-2">
                <div class="form-group">
                    <label>Estado</label>
                    <select id="comodo${comodoIndex}carac${caracteristicasCount}estado" class="form-control">
                        <option value="Bom">Bom</option>
                        <option value="Regular">Regular</option>
                        <option value="Ruim">Ruim</option>
                    </select>
                </div>
            </div>
            <div class="col-6">
                <div class="form-group">
                    <label>Observações</label>
                    <textarea id="comodo${comodoIndex}carac${caracteristicasCount}desc" class="form-control observacoes-textarea" placeholder="Descrição detalhada do estado do item" rows="4"></textarea>
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

// FUNÇÃO PARA SALVAR TERMO DE VISTORIA
function salvarTermoVistoria() {
    try {
        const dados = coletarDadosVistoriaFormulario();
        const nomeLocatario = dados.nomeLocatario || 'Vistoria Sem Nome';
        
        console.log('💾 DADOS QUE SERÃO SALVOS:', {
            nomeLocatario: nomeLocatario,
            totalComodos: dados.comodos.length,
            comodos: dados.comodos.map(c => ({
                nome: c.nome,
                totalCaracteristicas: c.caracteristicas.length,
                caracteristicas: c.caracteristicas
            }))
        });

        const termo = {
            id: 'termo_' + Date.now(),
            nomeLocatario: nomeLocatario,
            dataSalvamento: new Date().toLocaleString('pt-BR'),
            dados: dados
        };

        // Carregar termos existentes
        let termosSalvos = JSON.parse(localStorage.getItem('termosVistoriaSalvos')) || [];

        // Adicionar novo termo
        termosSalvos.unshift(termo);

        // Limitar a 50 termos salvos
        if (termosSalvos.length > 50) {
            termosSalvos = termosSalvos.slice(0, 50);
        }

        // Salvar no localStorage
        localStorage.setItem('termosVistoriaSalvos', JSON.stringify(termosSalvos));
        
        console.log('✅ TERMO SALVO NO LOCALSTORAGE:', termo);
        
        // Atualizar a lista
        carregarListaTermosSalvos();
        
        // Mostrar mensagem de sucesso
        if (window.app && window.app.showAlert) {
            window.app.showAlert(`✅ Termo de vistoria "${nomeLocatario}" salvo com sucesso!`, 'success');
        } else {
            alert(`✅ Termo de vistoria "${nomeLocatario}" salvo com sucesso!\n\nCômodos: ${dados.comodos.length}\nCaracterísticas totais: ${dados.comodos.reduce((total, c) => total + c.caracteristicas.length, 0)}`);
        }
        
        return true;
    } catch (error) {
        console.error('❌ Erro ao salvar termo:', error);
        if (window.app && window.app.showAlert) {
            window.app.showAlert('❌ Erro ao salvar termo de vistoria!', 'error');
        } else {
            alert('❌ Erro ao salvar termo de vistoria!');
        }
        return false;
    }
}

// FUNÇÃO PARA CARREGAR LISTA DE TERMOS SALVOS
function carregarListaTermosSalvos() {
    const container = document.getElementById('lista-termos-salvos');
    if (!container) return;

    const termosSalvos = JSON.parse(localStorage.getItem('termosVistoriaSalvos')) || [];

    if (termosSalvos.length === 0) {
        container.innerHTML = `
            <div class="alert alert-info text-center">
                📝 Nenhum termo de vistoria salvo ainda.
            </div>
        `;
        return;
    }

    const termosHTML = termosSalvos.map(termo => `
        <div class="card mb-3 termo-salvo-item" data-nome="${termo.nomeLocatario.toLowerCase()}">
            <div class="card-body">
                <div class="row align-items-center">
                    <div class="col-8">
                        <h6 class="card-title mb-1">${termo.nomeLocatario}</h6>
                        <p class="card-text text-muted small mb-0">
                            📅 Salvo em: ${termo.dataSalvamento}
                        </p>
                        <p class="card-text text-muted small mb-0">
                            🚪 Cômodos: ${termo.dados.comodos ? termo.dados.comodos.length : 0} | 
                            👥 Fiadores: ${termo.dados.fiadores ? termo.dados.fiadores.length : 0}
                        </p>
                    </div>
                    <div class="col-4 text-end">
                        <button class="btn btn-sm btn-outline-primary me-1" onclick="carregarTermoSalvo('${termo.id}')">
                            ✏️ Editar
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="excluirTermoSalvo('${termo.id}')">
                            🗑️ Excluir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    container.innerHTML = termosHTML;
}

// FUNÇÃO PARA FILTRAR TERMOS SALVOS
function filtrarTermosSalvos() {
    const filtro = document.getElementById('filtro-termos').value.toLowerCase();
    const itens = document.querySelectorAll('.termo-salvo-item');
    
    itens.forEach(item => {
        const nome = item.getAttribute('data-nome');
        if (nome.includes(filtro)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// FUNÇÃO PARA CARREGAR TERMO SALVO
function carregarTermoSalvo(id) {
    const termosSalvos = JSON.parse(localStorage.getItem('termosVistoriaSalvos')) || [];
    const termo = termosSalvos.find(t => t.id === id);
    
    if (!termo) {
        alert('Termo não encontrado!');
        return;
    }

    // Limpar formulário atual
    document.getElementById('termo-vistoria-form').reset();
    
    // Preencher com dados salvos
    const dados = termo.dados;
    
    // Preencher campos básicos
    const camposBasicos = [
        'nomeLocatario', 'RGLocatario', 'CPFLocatario', 'enderecoLocatario',
        'celular', 'email', 'enderecoImovel', 'dataContrato', 'dataVistoria',
        'nomeVistoriador', 'dia', 'mes', 'ano', 'nomeTestemunha1', 'CPFTestemunha1',
        'nomeTestemunha2', 'CPFTestemunha2'
    ];
    
    camposBasicos.forEach(campo => {
        const element = document.getElementById(campo);
        if (element && dados[campo]) {
            element.value = dados[campo];
        }
    });

    // Limpar fiadores e cômodos existentes
    const fiadoresContainer = document.getElementById('fiadores-vistoria-container');
    const comodosContainer = document.getElementById('comodos-container');
    
    if (fiadoresContainer) fiadoresContainer.innerHTML = '';
    if (comodosContainer) comodosContainer.innerHTML = '';

    // Recriar fiadores
    if (dados.fiadores && dados.fiadores.length > 0) {
        fiadoresVistoriaCount = 1;
        dados.fiadores.forEach(fiador => {
            adicionarFiadorVistoria();
            document.getElementById(`fiadorNome${fiadoresVistoriaCount - 1}`).value = fiador.nomeFiador || '';
            document.getElementById(`fiadorCPF${fiadoresVistoriaCount - 1}`).value = fiador.CPFFiador || '';
            document.getElementById(`fiadorRG${fiadoresVistoriaCount - 1}`).value = fiador.RGFiador || '';
            document.getElementById(`fiadorTelefone${fiadoresVistoriaCount - 1}`).value = fiador.celularFiador || '';
            document.getElementById(`fiadorEndereco${fiadoresVistoriaCount - 1}`).value = fiador.enderecoFiador || '';
            document.getElementById(`fiadorEmail${fiadoresVistoriaCount - 1}`).value = fiador.emailFiador || '';
        });
    }

    // Recriar cômodos
    if (dados.comodos && dados.comodos.length > 0) {
        comodosCount = 0;
        dados.comodos.forEach(comodo => {
            comodosCount++;
            const comodoHTML = `
                <div class="comodo-container mt-3 p-3 border rounded" id="comodo-${comodosCount}">
                    <div class="row align-items-center">
                        <div class="col-10">
                            <h4 class="comodo-titulo mb-0">
                                <span class="comodo-icone">🚪</span>
                                <span class="comodo-nome">${comodo.nome || `Cômodo ${comodosCount}`}</span>
                            </h4>
                        </div>
                        <div class="col-2 text-end">
                            <button type="button" class="btn btn-sm btn-outline-secondary me-1" onclick="toggleComodo(${comodosCount})">
                                <span class="comodo-toggle-icon">−</span>
                            </button>
                            <button type="button" class="btn btn-sm btn-danger" onclick="removerComodo(${comodosCount})">×</button>
                        </div>
                    </div>
                    
                    <div class="comodo-conteudo" id="comodo-conteudo-${comodosCount}">
                        <div class="form-group mt-3">
                            <label>Nome do Cômodo</label>
                            <input type="text" id="comodoNome${comodosCount}" class="form-control" value="${comodo.nome || ''}" onchange="atualizarNomeComodo(${comodosCount})">
                        </div>
                        <div class="section-header">
                            <h5>Características do Cômodo</h5>
                        </div>
                        <div id="caracteristicas-comodo-${comodosCount}">
                        </div>
                        <div class="row mt-2">
                            <div class="col-12">
                                <button type="button" class="btn btn-secondary btn-block" onclick="adicionarCaracteristicaComodo(${comodosCount})">
                                    + Adicionar Característica
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            comodosContainer.insertAdjacentHTML('beforeend', comodoHTML);

            // Recriar características
            if (comodo.caracteristicas && comodo.caracteristicas.length > 0) {
                const container = document.getElementById(`caracteristicas-comodo-${comodosCount}`);
                comodo.caracteristicas.forEach((carac, index) => {
                    const caracIndex = index + 1;
                    const caractHTML = `
                        <div class="row mt-3 align-items-start" id="carac-comodo-${comodosCount}-${caracIndex}">
                            <div class="col-3">
                                <div class="form-group">
                                    <label>Item</label>
                                    <input type="text" id="comodo${comodosCount}carac${caracIndex}nome" class="form-control" value="${carac.nome || ''}">
                                </div>
                            </div>
                            <div class="col-2">
                                <div class="form-group">
                                    <label>Estado</label>
                                    <select id="comodo${comodosCount}carac${caracIndex}estado" class="form-control">
                                        <option value="Bom" ${carac.estado === 'Bom' ? 'selected' : ''}>Bom</option>
                                        <option value="Regular" ${carac.estado === 'Regular' ? 'selected' : ''}>Regular</option>
                                        <option value="Ruim" ${carac.estado === 'Ruim' ? 'selected' : ''}>Ruim</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-group">
                                    <label>Observações</label>
                                    <textarea id="comodo${comodosCount}carac${caracIndex}desc" class="form-control observacoes-textarea" rows="4">${carac.descricao || ''}</textarea>
                                </div>
                            </div>
                            <div class="col-1">
                                <div class="form-group">
                                    <label>&nbsp;</label>
                                    <button type="button" class="btn btn-danger btn-block" onclick="removerCaracteristicaComodo(${comodosCount}, ${caracIndex})">×</button>
                                </div>
                            </div>
                        </div>
                    `;
                    
                    container.insertAdjacentHTML('beforeend', caractHTML);
                });
            }
        });
    }

    alert(`✅ Termo "${termo.nomeLocatario}" carregado com sucesso!`);
}

// FUNÇÃO PARA EXCLUIR TERMO SALVO
function excluirTermoSalvo(id) {
    if (confirm('Tem certeza que deseja excluir este termo salvo?')) {
        let termosSalvos = JSON.parse(localStorage.getItem('termosVistoriaSalvos')) || [];
        termosSalvos = termosSalvos.filter(t => t.id !== id);
        localStorage.setItem('termosVistoriaSalvos', JSON.stringify(termosSalvos));
        carregarListaTermosSalvos();
        alert('✅ Termo excluído com sucesso!');
    }
}

// FUNÇÃO PARA VISUALIZAR DADOS PREENCHIDOS
function visualizarDadosPreenchidos() {
    const dados = coletarDadosVistoriaFormulario();
    const container = document.getElementById('dados-visualizacao');
    
    if (!container) return;

    let html = `
        <div class="visualizacao-dados">
            <h5 class="text-primary mb-4">📋 RESUMO DOS DADOS PREENCHIDOS</h5>
            
            <div class="row">
                <div class="col-6">
                    <h6>👤 Dados do Locatário</h6>
                    <p><strong>Nome:</strong> ${dados.nomeLocatario || 'Não preenchido'}</p>
                    <p><strong>CPF:</strong> ${dados.CPFLocatario || 'Não preenchido'}</p>
                    <p><strong>Celular:</strong> ${dados.celular || 'Não preenchido'}</p>
                </div>
                <div class="col-6">
                    <h6>🏠 Dados do Imóvel</h6>
                    <p><strong>Endereço:</strong> ${dados.enderecoImovel || 'Não preenchido'}</p>
                    <p><strong>Vistoriador:</strong> ${dados.nomeVistoriador || 'Não preenchido'}</p>
                    <p><strong>Data Vistoria:</strong> ${dados.dataVistoria || 'Não preenchido'}</p>
                </div>
            </div>
            
            <hr>
            
            <div class="row">
                <div class="col-6">
                    <h6>👥 Fiadores (${dados.fiadores.length})</h6>
                    ${dados.fiadores.length > 0 ? 
                        dados.fiadores.map(f => `<p class="small">• ${f.nomeFiador} - ${f.CPFFiador}</p>`).join('') : 
                        '<p class="text-muted">Nenhum fiador cadastrado</p>'}
                </div>
                <div class="col-6">
                    <h6>🚪 Cômodos (${dados.comodos.length})</h6>
                    ${dados.comodos.length > 0 ? 
                        dados.comodos.map(c => `<p class="small">• ${c.nome} - ${c.caracteristicas.length} características</p>`).join('') : 
                        '<p class="text-muted">Nenhum cômodo cadastrado</p>'}
                </div>
            </div>
            
            <hr>
            
            <div class="alert alert-info">
                <strong>📊 Estatísticas:</strong><br>
                • Total de campos preenchidos: ${Object.values(dados).filter(v => v && v !== '').length}<br>
                • Fiadores cadastrados: ${dados.fiadores.length}<br>
                • Cômodos cadastrados: ${dados.comodos.length}<br>
                • Características totais: ${dados.comodos.reduce((total, c) => total + c.caracteristicas.length, 0)}
            </div>
        </div>
    `;
    
    container.innerHTML = html;
    
    // SOLUÇÃO SIMPLES: Usar o Bootstrap se disponível, senão criar modal manual
    const modalElement = document.getElementById('modalVisualizarDados');
    if (modalElement) {
        // Tentar com Bootstrap primeiro
        if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
        } else {
            // Fallback manual - SIMPLES
            modalElement.style.display = 'block';
            modalElement.style.background = 'rgba(0,0,0,0.5)';
            
            // Fazer o botão fechar funcionar
            const closeBtn = modalElement.querySelector('[data-bs-dismiss="modal"]');
            const closeBtn2 = modalElement.querySelector('.btn-secondary');
            
            if (closeBtn) {
                closeBtn.onclick = function() {
                    modalElement.style.display = 'none';
                };
            }
            if (closeBtn2) {
                closeBtn2.onclick = function() {
                    modalElement.style.display = 'none';
                };
            }
            
            // Fechar clicando fora do conteúdo
            modalElement.onclick = function(event) {
                if (event.target === modalElement) {
                    modalElement.style.display = 'none';
                }
            };
        }
    }
}

// FUNÇÃO PARA GERAR TERMO DE VISTORIA
async function gerarTermoVistoria() {
    console.log('Gerando termo de vistoria...');

    try {
        const dadosForm = coletarDadosVistoriaFormulario();

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

        const urlAPI = '/api/gerar-documento/termo-vistoria';
        const response = await fetch(urlAPI, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dadosParaTemplate)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Servidor retornou erro ${response.status}: ${errorText}`);
        }

        const blob = await response.blob();

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
    // Coletar fiadores (essa parte está funcionando)
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

    console.log('🔍 COLETANDO CÔMODOS E CARACTERÍSTICAS...');
    // Coletar cômodos e características - CORREÇÃO AQUI
    for (let i = 1; i <= comodosCount; i++) {
        const comodoElement = document.getElementById(`comodo-${i}`);
        
        // Verificar se o cômodo existe e está visível
        if (comodoElement && comodoElement.offsetParent !== null) {
            const comodoNome = document.getElementById(`comodoNome${i}`)?.value || "";
            
            console.log(`📦 Verificando cômodo ${i}: "${comodoNome}"`);
            
            if (comodoNome.trim()) {
                const caracteristicas = [];
                const container = document.getElementById(`caracteristicas-comodo-${i}`);
                
                if (container) {
                    // Coletar TODAS as características do container
                    const caracteristicasElements = container.querySelectorAll('[id^="carac-comodo-"]');
                    console.log(`   Encontradas ${caracteristicasElements.length} características no container`);
                    
                    caracteristicasElements.forEach(caracElement => {
                        // Extrair índices do ID
                        const id = caracElement.id;
                        const match = id.match(/carac-comodo-(\d+)-(\d+)/);
                        
                        if (match) {
                            const comodoIndex = match[1];
                            const caracIndex = match[2];
                            
                            const nomeInput = document.getElementById(`comodo${comodoIndex}carac${caracIndex}nome`);
                            const estadoSelect = document.getElementById(`comodo${comodoIndex}carac${caracIndex}estado`);
                            const descInput = document.getElementById(`comodo${comodoIndex}carac${caracIndex}desc`);
                            
                            if (nomeInput && estadoSelect && descInput) {
                                const caracNome = nomeInput.value || "";
                                const caracEstado = estadoSelect.value || 'Bom';
                                const caracDesc = descInput.value || "";
                                
                                if (caracNome.trim()) {
                                    caracteristicas.push({ 
                                        nome: caracNome, 
                                        estado: caracEstado, 
                                        descricao: caracDesc 
                                    });
                                    console.log(`   ✅ Característica: ${caracNome} - ${caracEstado}`);
                                }
                            }
                        }
                    });
                }
                
                dados.comodos.push({ 
                    nome: comodoNome, 
                    caracteristicas: caracteristicas 
                });
                
                console.log(`   ✅ Cômodo "${comodoNome}" salvo com ${caracteristicas.length} características`);
            }
        }
    }

    console.log('📋 DADOS COLETADOS:', {
        fiadores: dados.fiadores.length,
        comodos: dados.comodos.length,
        comodosDetalhes: dados.comodos.map(c => ({
            nome: c.nome,
            caracteristicas: c.caracteristicas.length
        }))
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