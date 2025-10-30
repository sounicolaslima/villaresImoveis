let relatorioData = [];
let condominios = JSON.parse(localStorage.getItem('condominios')) || [];

// FUNÇÃO PRINCIPAL PARA CARREGAR A PÁGINA
async function loadRelatorioPage() {
    const content = document.getElementById('page-content');

    content.innerHTML = `
        <div class="page-container">
            <div class="page-header">
                <button class="btn btn-secondary" onclick="goBack()">← VOLTAR</button>
                <h1>📊 RELATÓRIO FINANCEIRO</h1>
            </div>

            <div class="main-container">
                <form id="relatorio-form">
                    <div class="section-header">
                        <h3>DADOS DO RELATÓRIO</h3>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>Nome do Condomínio</label>
                                <div class="input-group">
                                    <select id="nomecondominio" class="form-control">
                                        <option value="">Selecione um condomínio</option>
                                    </select>
                                    <button type="button" class="btn btn-outline-primary" onclick="abrirModalCondominio()">
                                        📝 Cadastrar/Editar
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>Endereço do Condomínio</label>
                                <input type="text" id="enderecoCondominio" class="form-control" placeholder="Endereço será preenchido automaticamente" readonly style="background-color: #f8f9fa;">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-4">
                            <div class="form-group">
                                <label>Número da Unidade</label>
                                <input type="text" id="unidade" class="form-control" placeholder="Ex: 101">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Quantidade de Unidades</label>
                                <input type="number" id="quantidadeUnidades" class="form-control" placeholder="Ex: 10" value="1" min="1">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Mês/Ano das Despesas</label>
                                <input type="text" id="mesAnoDespesas" class="form-control" placeholder="Ex: OUTUBRO DE 2025">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-4">
                            <div class="form-group">
                                <label>Data de Vencimento</label>
                                <input type="text" id="vencimento" class="form-control" placeholder="dd/mm/aaaa">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Período de Referência</label>
                                <input type="text" id="periodoReferencia" class="form-control" placeholder="mm/aaaa">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Data de Emissão</label>
                                <input type="text" id="dataEmissao" class="form-control" placeholder="dd/mm/aaaa">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>Responsável</label>
                                <input type="text" id="responsavel" class="form-control" placeholder="Nome do responsável">
                            </div>
                        </div>
                    </div>

                    <div class="section-header">
                        <h3>DESPESAS</h3>
                    </div>

                    <div class="row">
                        <div class="col-4">
                            <div class="form-group">
                                <label>Valor Energia (R$):</label>
                                <input type="text" id="valorEnergia" class="form-control money" value="0,00">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Valor Água (R$):</label>
                                <input type="text" id="valorAgua" class="form-control money" value="0,00">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Valor Limpeza (R$):</label>
                                <input type="text" id="valorLimpeza" class="form-control money" value="0,00">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-4">
                            <div class="form-group">
                                <label>Valor Materiais (R$):</label>
                                <input type="text" id="valorMateriais" class="form-control money" value="0,00">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Honorários (R$):</label>
                                <input type="text" id="honorarios" class="form-control money" value="0,00">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Valor Tarifas (R$):</label>
                                <input type="text" id="valortarifas" class="form-control money" value="0,00">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>Total de Despesas (R$):</label>
                                <input type="text" id="totaldespesas" class="form-control" value="0,00" readonly style="background-color: #e9ecef; font-weight: bold;">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>Despesa por Unidade (R$):</label>
                                <input type="text" id="despesaPorUnidade" class="form-control" value="0,00" readonly style="background-color: #e9ecef; font-weight: bold;">
                            </div>
                        </div>
                    </div>

                    <div class="section-header">
                        <h3>OUTROS VALORES</h3>
                    </div>

                    <div class="row">
                        <div class="col-4">
                            <div class="form-group">
                                <label>Valor Aluguel (R$):</label>
                                <input type="text" id="valorAluguel" class="form-control money" value="0,00">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Valor IPTU (R$):</label>
                                <input type="text" id="valorIPTU" class="form-control money" value="0,00">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Valor Condomínio (R$):</label>
                                <input type="text" id="valorCondominio" class="form-control money" value="0,00">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>Valor Total Final (R$):</label>
                                <input type="text" id="valorTotalFinal" class="form-control" value="0,00" readonly style="background-color: #e9ecef; font-weight: bold; font-size: 1.2em;">
                            </div>
                        </div>
                    </div>

                    <!-- Botões -->
                    <div class="row mt-3">
                        <div class="col-4">
                            <button type="button" class="btn btn-secondary btn-block" onclick="visualizarRelatorio()">
                                👁️ Visualizar
                            </button>
                        </div>
                        <div class="col-4">
                            <button type="button" class="btn btn-info btn-block" onclick="gerarRelatorioTemplate()">
                                📊 Gerar Template
                            </button>
                        </div>
                        <div class="col-4">
                            <button type="button" class="btn btn-primary btn-block" onclick="gerarRelatorioVisualizacao()">
                                🎨 Gerar Visualização
                            </button>
                        </div>
                    </div>
                </form>

                <!-- Visualização do Relatório -->
                <div id="visualizacao-relatorio" class="hidden mt-3">
                    <div class="section-header">
                        <h3>👁️ VISUALIZAÇÃO DO RELATÓRIO</h3>
                    </div>
                    <div class="form-container">
                        <div class="row">
                            <div class="col-6">
                                <h4>Dados do Relatório:</h4>
                                <p><strong>Condomínio:</strong> <span id="preview-nomecondominio"></span></p>
                                <p><strong>Endereço:</strong> <span id="preview-enderecoCondominio"></span></p>
                                <p><strong>Unidade:</strong> <span id="preview-unidade"></span></p>
                                <p><strong>Quantidade de Unidades:</strong> <span id="preview-quantidadeUnidades"></span></p>
                                <p><strong>Mês/Ano:</strong> <span id="preview-mesAnoDespesas"></span></p>
                                <p><strong>Vencimento:</strong> <span id="preview-vencimento"></span></p>
                                <p><strong>Data Emissão:</strong> <span id="preview-dataEmissao"></span></p>
                                <p><strong>Responsável:</strong> <span id="preview-responsavel"></span></p>
                            </div>
                            <div class="col-6">
                                <h4>Despesas:</h4>
                                <p><strong>Energia:</strong> R$ <span id="preview-valorEnergia">0,00</span></p>
                                <p><strong>Água:</strong> R$ <span id="preview-valorAgua">0,00</span></p>
                                <p><strong>Limpeza:</strong> R$ <span id="preview-valorLimpeza">0,00</span></p>
                                <p><strong>Materiais:</strong> R$ <span id="preview-valorMateriais">0,00</span></p>
                                <p><strong>Honorários:</strong> R$ <span id="preview-honorarios">0,00</span></p>
                                <p><strong>Tarifas:</strong> R$ <span id="preview-valortarifas">0,00</span></p>
                                <p class="alert alert-warning"><strong>Total Despesas:</strong> R$ <span id="preview-totaldespesas">0,00</span></p>
                                <p class="alert alert-info"><strong>Despesa por Unidade:</strong> R$ <span id="preview-despesaPorUnidade">0,00</span></p>
                                
                                <h4>Outros Valores:</h4>
                                <p><strong>Aluguel:</strong> R$ <span id="preview-valorAluguel">0,00</span></p>
                                <p><strong>IPTU:</strong> R$ <span id="preview-valorIPTU">0,00</span></p>
                                <p><strong>Condomínio:</strong> R$ <span id="preview-valorCondominio">0,00</span></p>
                                <p class="alert alert-success"><strong>Total Final:</strong> R$ <span id="preview-valorTotalFinal">0,00</span></p>
                            </div>
                        </div>

                        <div class="alert alert-info mt-3">
                            <strong>Escolha o formato de geração acima: Template padrão ou Visualização formatada.</strong>
                        </div>
                    </div>
                </div>

                <!-- Download -->
                <div id="download-section" class="hidden mt-3">
                    <div class="alert alert-success text-center">
                        ✅ Relatório gerado com sucesso!
                    </div>
                    <button id="download-btn" class="btn btn-primary btn-block">
                        📥 BAIXAR RELATÓRIO
                    </button>
                </div>
            </div>
        </div>

        <!-- Modal para Cadastro/Edição de Condomínios -->
        <div id="modalCondominio" class="modal hidden">
            <div class="modal-content">
                <div class="modal-header">
                    <h4>📝 Cadastrar/Editar Condomínio</h4>
                    <button type="button" class="close" onclick="fecharModalCondominio()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Nome do Condomínio</label>
                        <input type="text" id="modalNomeCondominio" class="form-control" placeholder="Digite o nome do condomínio">
                    </div>
                    <div class="form-group">
                        <label>Endereço Completo</label>
                        <textarea id="modalEnderecoCondominio" class="form-control" rows="3" placeholder="Digite o endereço completo"></textarea>
                    </div>
                    <div class="form-group">
                        <label>Quantidade de Unidades</label>
                        <input type="number" id="modalQuantidadeUnidades" class="form-control" placeholder="Quantidade total de unidades" min="1" value="1">
                    </div>
                    
                    <div class="section-header">
                        <h5>Condomínios Cadastrados</h5>
                    </div>
                    <div id="lista-condominios" class="mt-2" style="max-height: 200px; overflow-y: auto;">
                        <!-- Lista de condomínios será preenchida aqui -->
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="fecharModalCondominio()">Cancelar</button>
                    <button type="button" class="btn btn-success" onclick="salvarCondominio()">Salvar Condomínio</button>
                    <button type="button" class="btn btn-danger" onclick="excluirCondominio()" style="display: none;" id="btnExcluir">Excluir</button>
                </div>
            </div>
        </div>
    `;

    // Inicializar funcionalidades
    carregarCondominios();
    setupRelatorioEventListeners();
}

// CARREGAR CONDOMÍNIOS NO SELECT
function carregarCondominios() {
    const select = document.getElementById('nomecondominio');
    const lista = document.getElementById('lista-condominios');
    
    if (select) {
        // Limpar options exceto o primeiro
        while (select.options.length > 1) {
            select.remove(1);
        }
        
        // Adicionar condomínios ao select
        condominios.forEach((cond, index) => {
            const option = new Option(cond.nome, cond.nome);
            select.add(option);
        });
    }
    
    if (lista) {
        lista.innerHTML = '';
        condominios.forEach((cond, index) => {
            const div = document.createElement('div');
            div.className = 'card mb-2 p-2';
            div.innerHTML = `
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <strong>${cond.nome}</strong><br>
                        <small class="text-muted">${cond.endereco}</small><br>
                        <small class="text-muted">${cond.quantidadeUnidades || 1} unidades</small>
                    </div>
                    <button type="button" class="btn btn-sm btn-outline-primary" onclick="editarCondominio(${index})">Editar</button>
                </div>
            `;
            lista.appendChild(div);
        });
        
        if (condominios.length === 0) {
            lista.innerHTML = '<p class="text-muted text-center">Nenhum condomínio cadastrado</p>';
        }
    }
}

// ABRIR MODAL DE CONDOMÍNIO
function abrirModalCondominio() {
    document.getElementById('modalCondominio').classList.remove('hidden');
    document.getElementById('modalNomeCondominio').value = '';
    document.getElementById('modalEnderecoCondominio').value = '';
    document.getElementById('modalQuantidadeUnidades').value = '1';
    document.getElementById('btnExcluir').style.display = 'none';
    document.getElementById('btnExcluir').removeAttribute('data-index');
    carregarCondominios();
}

// FECHAR MODAL DE CONDOMÍNIO
function fecharModalCondominio() {
    document.getElementById('modalCondominio').classList.add('hidden');
}

// SALVAR CONDOMÍNIO
function salvarCondominio() {
    const nome = document.getElementById('modalNomeCondominio').value.trim();
    const endereco = document.getElementById('modalEnderecoCondominio').value.trim();
    const quantidadeUnidades = parseInt(document.getElementById('modalQuantidadeUnidades').value) || 1;
    
    if (!nome || !endereco) {
        alert('Por favor, preencha todos os campos!');
        return;
    }
    
    const indexEditando = document.getElementById('btnExcluir').getAttribute('data-index');
    
    if (indexEditando !== null) {
        // Editando
        condominios[indexEditando] = { nome, endereco, quantidadeUnidades };
    } else {
        // Novo condomínio
        condominios.push({ nome, endereco, quantidadeUnidades });
    }
    
    // Salvar no localStorage
    localStorage.setItem('condominios', JSON.stringify(condominios));
    
    // Atualizar interface
    carregarCondominios();
    fecharModalCondominio();
    
    alert('Condomínio salvo com sucesso!');
}

// EDITAR CONDOMÍNIO
function editarCondominio(index) {
    const condominio = condominios[index];
    
    document.getElementById('modalNomeCondominio').value = condominio.nome;
    document.getElementById('modalEnderecoCondominio').value = condominio.endereco;
    document.getElementById('modalQuantidadeUnidades').value = condominio.quantidadeUnidades || 1;
    document.getElementById('btnExcluir').style.display = 'inline-block';
    document.getElementById('btnExcluir').setAttribute('data-index', index);
    
    document.getElementById('modalCondominio').classList.remove('hidden');
}

// EXCLUIR CONDOMÍNIO
function excluirCondominio() {
    const index = document.getElementById('btnExcluir').getAttribute('data-index');
    
    if (index === null) return;
    
    if (confirm('Tem certeza que deseja excluir este condomínio?')) {
        condominios.splice(index, 1);
        localStorage.setItem('condominios', JSON.stringify(condominios));
        carregarCondominios();
        fecharModalCondominio();
        alert('Condomínio excluído com sucesso!');
    }
}

// CONFIGURAR EVENT LISTENERS
function setupRelatorioEventListeners() {
    // Evento para quando selecionar um condomínio
    const selectCondominio = document.getElementById('nomecondominio');
    if (selectCondominio) {
        selectCondominio.addEventListener('change', function() {
            const condominioSelecionado = condominios.find(cond => cond.nome === this.value);
            const enderecoInput = document.getElementById('enderecoCondominio');
            const quantidadeInput = document.getElementById('quantidadeUnidades');
            
            if (condominioSelecionado) {
                if (enderecoInput) {
                    enderecoInput.value = condominioSelecionado.endereco;
                }
                if (quantidadeInput) {
                    quantidadeInput.value = condominioSelecionado.quantidadeUnidades || 1;
                }
            } else {
                if (enderecoInput) enderecoInput.value = '';
                if (quantidadeInput) quantidadeInput.value = '1';
            }
            
            calcularTotais();
        });
    }

    // Evento para quantidade de unidades
    const quantidadeInput = document.getElementById('quantidadeUnidades');
    if (quantidadeInput) {
        quantidadeInput.addEventListener('input', calcularTotais);
    }

    // Eventos para campos monetários
    const camposMonetarios = [
        'valorEnergia', 'valorAgua', 'valorLimpeza', 'valorMateriais',
        'honorarios', 'valortarifas', 'valorAluguel', 'valorIPTU', 'valorCondominio'
    ];
    
    camposMonetarios.forEach(campo => {
        const input = document.getElementById(campo);
        if (input) {
            input.addEventListener('input', calcularTotais);
            input.addEventListener('blur', formatarMoeda);
        }
    });

    // Calcular totais iniciais
    calcularTotais();
}

// FORMATAR MOEDA
function formatarMoeda(event) {
    const input = event.target;
    let value = input.value.replace(/\D/g, "");

    if (value === "") {
        input.value = '0,00';
        return;
    }

    value = parseInt(value, 10);
    const formatted = (value / 100).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    
    input.value = formatted;
    calcularTotais();
}

// CALCULAR TOTAIS
function calcularTotais() {
    // Calcular total de despesas
    const despesas = [
        'valorEnergia', 'valorAgua', 'valorLimpeza', 
        'valorMateriais', 'honorarios', 'valortarifas'
    ];

    let totalDespesas = 0;

    despesas.forEach(campo => {
        const input = document.getElementById(campo);
        if (!input) return;

        let valor = input.value || '0';
        valor = valor.replace('R$', '').replace(/\./g, '').replace(',', '.').trim();
        totalDespesas += parseFloat(valor) || 0;
    });

    // Calcular despesa por unidade
    const quantidadeUnidades = parseInt(document.getElementById('quantidadeUnidades').value) || 1;
    const despesaPorUnidade = quantidadeUnidades > 0 ? totalDespesas / quantidadeUnidades : 0;

    // Calcular valor total final
    const outrosValores = ['valorAluguel', 'valorIPTU', 'valorCondominio'];
    let totalOutros = 0;

    outrosValores.forEach(campo => {
        const input = document.getElementById(campo);
        if (!input) return;

        let valor = input.value || '0';
        valor = valor.replace('R$', '').replace(/\./g, '').replace(',', '.').trim();
        totalOutros += parseFloat(valor) || 0;
    });

    const valorTotalFinal = despesaPorUnidade + totalOutros;

    // Atualizar campos
    const totalDespesasFormatado = totalDespesas.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const despesaPorUnidadeFormatado = despesaPorUnidade.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const totalFinalFormatado = valorTotalFinal.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const totalDespesasInput = document.getElementById('totaldespesas');
    const despesaPorUnidadeInput = document.getElementById('despesaPorUnidade');
    const totalFinalInput = document.getElementById('valorTotalFinal');

    if (totalDespesasInput) totalDespesasInput.value = totalDespesasFormatado;
    if (despesaPorUnidadeInput) despesaPorUnidadeInput.value = despesaPorUnidadeFormatado;
    if (totalFinalInput) totalFinalInput.value = totalFinalFormatado;
}

// VISUALIZAR RELATÓRIO
function visualizarRelatorio() {
    relatorioData = collectRelatorioFormData();

    // Atualizar preview
    document.getElementById('preview-nomecondominio').textContent = relatorioData.nomecondominio || 'Não informado';
    document.getElementById('preview-enderecoCondominio').textContent = relatorioData.enderecoCondominio || 'Não informado';
    document.getElementById('preview-unidade').textContent = relatorioData.unidade || 'Não informado';
    document.getElementById('preview-quantidadeUnidades').textContent = relatorioData.quantidadeUnidades || '1';
    document.getElementById('preview-mesAnoDespesas').textContent = relatorioData.mesAnoDespesas || 'Não informado';
    document.getElementById('preview-vencimento').textContent = relatorioData.vencimento || 'Não informado';
    document.getElementById('preview-dataEmissao').textContent = relatorioData.dataEmissao || 'Não informado';
    document.getElementById('preview-responsavel').textContent = relatorioData.responsavel || 'Não informado';

    document.getElementById('preview-valorEnergia').textContent = relatorioData.valorEnergia || '0,00';
    document.getElementById('preview-valorAgua').textContent = relatorioData.valorAgua || '0,00';
    document.getElementById('preview-valorLimpeza').textContent = relatorioData.valorLimpeza || '0,00';
    document.getElementById('preview-valorMateriais').textContent = relatorioData.valorMateriais || '0,00';
    document.getElementById('preview-honorarios').textContent = relatorioData.honorarios || '0,00';
    document.getElementById('preview-valortarifas').textContent = relatorioData.valortarifas || '0,00';
    document.getElementById('preview-totaldespesas').textContent = relatorioData.totaldespesas || '0,00';
    document.getElementById('preview-despesaPorUnidade').textContent = relatorioData.despesaPorUnidade || '0,00';
    document.getElementById('preview-valorAluguel').textContent = relatorioData.valorAluguel || '0,00';
    document.getElementById('preview-valorIPTU').textContent = relatorioData.valorIPTU || '0,00';
    document.getElementById('preview-valorCondominio').textContent = relatorioData.valorCondominio || '0,00';
    document.getElementById('preview-valorTotalFinal').textContent = relatorioData.valorTotalFinal || '0,00';

    // Mostrar visualização
    document.getElementById('visualizacao-relatorio').classList.remove('hidden');
}

// COLETAR DADOS DO FORMULÁRIO
function collectRelatorioFormData() {
    const getValue = (id) => {
        const element = document.getElementById(id);
        return element ? element.value : "";
    };

    return {
        nomecondominio: getValue('nomecondominio'),
        enderecoCondominio: getValue('enderecoCondominio'),
        unidade: getValue('unidade'),
        quantidadeUnidades: getValue('quantidadeUnidades'),
        mesAnoDespesas: getValue('mesAnoDespesas'),
        vencimento: getValue('vencimento'),
        periodoReferencia: getValue('periodoReferencia'),
        dataEmissao: getValue('dataEmissao'),
        responsavel: getValue('responsavel'),
        valorEnergia: getValue('valorEnergia'),
        valorAgua: getValue('valorAgua'),
        valorLimpeza: getValue('valorLimpeza'),
        valorMateriais: getValue('valorMateriais'),
        honorarios: getValue('honorarios'),
        valortarifas: getValue('valortarifas'),
        totaldespesas: getValue('totaldespesas'),
        despesaPorUnidade: getValue('despesaPorUnidade'),
        valorAluguel: getValue('valorAluguel'),
        valorIPTU: getValue('valorIPTU'),
        valorCondominio: getValue('valorCondominio'),
        valorTotalFinal: getValue('valorTotalFinal')
    };
}

// GERAR RELATÓRIO NO FORMATO TEMPLATE (original) - DOCX
async function gerarRelatorioTemplate() {
    try {
        if (!relatorioData || Object.keys(relatorioData).length === 0) {
            relatorioData = collectRelatorioFormData();
        }

        console.log('📊 Enviando dados para gerar relatório (Template)!', relatorioData);

        const response = await fetch('/api/gerar-documento/gestaodecondominio', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(relatorioData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro do servidor: ${response.status} - ${errorText}`);
        }

        const blob = await response.blob();

        if (blob.size === 0) {
            throw new Error('Arquivo vazio recebido do servidor');
        }

        const url = window.URL.createObjectURL(blob);

        // Configurar botão de download
        const downloadBtn = document.getElementById('download-btn');
        if (downloadBtn) {
            downloadBtn.onclick = () => {
                const a = document.createElement('a');
                a.href = url;
                a.download = `Relatorio_Template_${relatorioData.nomecondominio || 'Relatorio'}_${new Date().toISOString().split("T")[0]}.docx`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            };
        }

        // Mostrar seção de download
        document.getElementById('download-section').classList.remove('hidden');

        if (window.app && window.app.showAlert) {
            window.app.showAlert('Relatório (Template) gerado com sucesso!', 'success');
        }

    } catch (error) {
        console.error('❌ Erro ao gerar relatório (Template)!', error);
        if (window.app && window.app.showAlert) {
            window.app.showAlert('Erro ao gerar relatório (Template)! ' + error.message, 'error');
        }
    }
}

// GERAR RELATÓRIO NO FORMATO VISUALIZAÇÃO - PDF (sem mexer no servidor)
async function gerarRelatorioVisualizacao() {
    try {
        if (!relatorioData || Object.keys(relatorioData).length === 0) {
            relatorioData = collectRelatorioFormData();
        }

        console.log('🎨 Gerando relatório (Visualização) como PDF!', relatorioData);

        // Criar conteúdo HTML para o PDF
        const conteudoPDF = criarConteudoPDF(relatorioData);
        
        // Criar uma nova janela para gerar o PDF
        const janelaPDF = window.open('', '_blank');
        janelaPDF.document.write(conteudoPDF);
        janelaPDF.document.close();
        
        // Esperar o conteúdo carregar e então imprimir como PDF
        setTimeout(() => {
            janelaPDF.print();
            
            // Mostrar seção de download com mensagem diferente
            document.getElementById('download-section').classList.remove('hidden');
            document.querySelector('#download-section .alert').textContent = '✅ Relatório (Visualização) pronto para salvar como PDF!';
            
            // Configurar botão para abrir novamente o PDF se necessário
            const downloadBtn = document.getElementById('download-btn');
            if (downloadBtn) {
                downloadBtn.textContent = '📄 Abrir PDF Novamente';
                downloadBtn.onclick = () => {
                    const novaJanela = window.open('', '_blank');
                    novaJanela.document.write(conteudoPDF);
                    novaJanela.document.close();
                    setTimeout(() => novaJanela.print(), 500);
                };
            }

            if (window.app && window.app.showAlert) {
                window.app.showAlert('Relatório (Visualização) pronto! Use a opção "Salvar como PDF" na impressão.', 'success');
            }
        }, 500);

    } catch (error) {
        console.error('❌ Erro ao gerar relatório (Visualização)!', error);
        if (window.app && window.app.showAlert) {
            window.app.showAlert('Erro ao gerar relatório (Visualização)! ' + error.message, 'error');
        }
    }
}

// FUNÇÃO PARA CRIAR CONTEÚDO DO PDF
function criarConteudoPDF(dados) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Relatório Financeiro - ${dados.nomecondominio || 'Condomínio'}</title>
            <style>
                @media print {
                    body { 
                        font-family: Arial, sans-serif; 
                        margin: 20px; 
                        color: #333;
                        font-size: 14px;
                    }
                    .header { 
                        text-align: center; 
                        border-bottom: 2px solid #333; 
                        padding-bottom: 15px; 
                        margin-bottom: 20px; 
                    }
                    .section { 
                        margin-bottom: 20px; 
                        page-break-inside: avoid;
                    }
                    .section h3 { 
                        background-color: #f8f9fa; 
                        padding: 10px; 
                        border-left: 4px solid #007bff;
                        margin-bottom: 15px;
                    }
                    .row { 
                        display: flex; 
                        margin-bottom: 15px;
                        page-break-inside: avoid;
                    }
                    .col-6 { 
                        flex: 1; 
                        padding: 0 15px; 
                    }
                    .alert { 
                        padding: 12px; 
                        border-radius: 4px; 
                        margin: 8px 0;
                        border: 1px solid;
                    }
                    .alert-warning { 
                        background-color: #fff3cd; 
                        border-color: #ffeaa7; 
                    }
                    .alert-info { 
                        background-color: #d1ecf1; 
                        border-color: #bee5eb; 
                    }
                    .alert-success { 
                        background-color: #d4edda; 
                        border-color: #c3e6cb; 
                        font-weight: bold;
                        font-size: 16px;
                    }
                    p { 
                        margin: 8px 0; 
                        line-height: 1.4;
                    }
                    strong { 
                        color: #333; 
                    }
                    h1 {
                        color: #2c3e50;
                        margin-bottom: 10px;
                    }
                    h2 {
                        color: #34495e;
                        margin-bottom: 5px;
                    }
                    h3 {
                        color: #2c3e50;
                        margin-top: 0;
                    }
                    h4 {
                        color: #34495e;
                        border-bottom: 1px solid #ecf0f1;
                        padding-bottom: 5px;
                        margin-bottom: 10px;
                    }
                }
                
                /* Estilo para visualização na tela */
                body { 
                    font-family: Arial, sans-serif; 
                    margin: 25px; 
                    color: #333;
                    font-size: 14px;
                }
                .header { 
                    text-align: center; 
                    border-bottom: 2px solid #333; 
                    padding-bottom: 15px; 
                    margin-bottom: 25px; 
                }
                .section { 
                    margin-bottom: 25px; 
                }
                .section h3 { 
                    background-color: #f8f9fa; 
                    padding: 12px; 
                    border-left: 4px solid #007bff;
                    margin-bottom: 15px;
                }
                .row { 
                    display: flex; 
                    margin-bottom: 20px;
                }
                .col-6 { 
                    flex: 1; 
                    padding: 0 20px; 
                }
                .alert { 
                    padding: 15px; 
                    border-radius: 6px; 
                    margin: 10px 0;
                    border: 1px solid;
                }
                .alert-warning { 
                    background-color: #fff3cd; 
                    border-color: #ffeaa7; 
                }
                .alert-info { 
                    background-color: #d1ecf1; 
                    border-color: #bee5eb; 
                }
                .alert-success { 
                    background-color: #d4edda; 
                    border-color: #c3e6cb; 
                    font-weight: bold;
                    font-size: 16px;
                }
                p { 
                    margin: 10px 0; 
                    line-height: 1.5;
                }
                strong { 
                    color: #2c3e50; 
                }
                h1 {
                    color: #2c3e50;
                    margin-bottom: 15px;
                    font-size: 28px;
                }
                h2 {
                    color: #34495e;
                    margin-bottom: 10px;
                    font-size: 22px;
                }
                h3 {
                    color: #2c3e50;
                    margin-top: 0;
                    font-size: 18px;
                }
                h4 {
                    color: #34495e;
                    border-bottom: 2px solid #ecf0f1;
                    padding-bottom: 8px;
                    margin-bottom: 15px;
                    font-size: 16px;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>📊 RELATÓRIO FINANCEIRO - CONDOMÍNIO</h1>
                <h2>${dados.nomecondominio || 'Condomínio Não Informado'}</h2>
                <p><strong>Data de Emissão:</strong> ${dados.dataEmissao || 'Não informada'}</p>
            </div>

            <div class="row">
                <div class="col-6">
                    <div class="section">
                        <h3>📋 DADOS DO RELATÓRIO</h3>
                        <p><strong>Condomínio:</strong> ${dados.nomecondominio || 'Não informado'}</p>
                        <p><strong>Endereço:</strong> ${dados.enderecoCondominio || 'Não informado'}</p>
                        <p><strong>Unidade:</strong> ${dados.unidade || 'Não informado'}</p>
                        <p><strong>Quantidade de Unidades:</strong> ${dados.quantidadeUnidades || '1'}</p>
                        <p><strong>Mês/Ano de Referência:</strong> ${dados.mesAnoDespesas || 'Não informado'}</p>
                        <p><strong>Data de Vencimento:</strong> ${dados.vencimento || 'Não informado'}</p>
                        <p><strong>Período de Referência:</strong> ${dados.periodoReferencia || 'Não informado'}</p>
                        <p><strong>Responsável:</strong> ${dados.responsavel || 'Não informado'}</p>
                    </div>
                </div>
                <div class="col-6">
                    <div class="section">
                        <h3>💰 DESPESAS DO CONDOMÍNIO</h3>
                        <p><strong>Energia:</strong> R$ ${dados.valorEnergia || '0,00'}</p>
                        <p><strong>Água:</strong> R$ ${dados.valorAgua || '0,00'}</p>
                        <p><strong>Limpeza:</strong> R$ ${dados.valorLimpeza || '0,00'}</p>
                        <p><strong>Materiais:</strong> R$ ${dados.valorMateriais || '0,00'}</p>
                        <p><strong>Honorários:</strong> R$ ${dados.honorarios || '0,00'}</p>
                        <p><strong>Tarifas Bancárias:</strong> R$ ${dados.valortarifas || '0,00'}</p>
                        <div class="alert alert-warning">
                            <strong>💰 TOTAL DE DESPESAS:</strong> R$ ${dados.totaldespesas || '0,00'}
                        </div>
                        <div class="alert alert-info">
                            <strong>🏠 DESPESA POR UNIDADE:</strong> R$ ${dados.despesaPorUnidade || '0,00'}
                        </div>
                        
                        <h3>💵 OUTROS VALORES</h3>
                        <p><strong>Aluguel:</strong> R$ ${dados.valorAluguel || '0,00'}</p>
                        <p><strong>IPTU:</strong> R$ ${dados.valorIPTU || '0,00'}</p>
                        <p><strong>Condomínio:</strong> R$ ${dados.valorCondominio || '0,00'}</p>
                        <div class="alert alert-success">
                            <strong>🎯 VALOR TOTAL FINAL:</strong> R$ ${dados.valorTotalFinal || '0,00'}
                        </div>
                    </div>
                </div>
            </div>

            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ecf0f1;">
                <p><em>Relatório gerado em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}</em></p>
            </div>

            <script>
                // Focar na janela para impressão
                window.focus();
            </script>
        </body>
        </html>
   `;
}