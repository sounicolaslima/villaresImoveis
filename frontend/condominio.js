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
                                <input type="text" id="unidade" class="form-control" placeholder="Ex: 101" value="101">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Mês/Ano das Despesas</label>
                                <input type="text" id="mesAnoDespesas" class="form-control" placeholder="Ex: OUTUBRO DE 2025" value="${new Date().toLocaleDateString('pt-BR', {month: 'long', year: 'numeric'}).toUpperCase()}">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Data de Vencimento</label>
                                <input type="text" id="vencimento" class="form-control" placeholder="dd/mm/aaaa" value="${new Date(new Date().getFullYear(), new Date().getMonth() + 1, 10).toLocaleDateString('pt-BR')}">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-4">
                            <div class="form-group">
                                <label>Período de Referência</label>
                                <input type="text" id="periodoReferencia" class="form-control" placeholder="mm/aaaa" value="${new Date().toLocaleDateString('pt-BR', {month: '2-digit', year: 'numeric'})}">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Data de Emissão</label>
                                <input type="text" id="dataEmissao" class="form-control" value="${new Date().toLocaleDateString('pt-BR')}">
                            </div>
                        </div>
                        <div class="col-4">
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
                        <div class="col-6">
                            <button type="button" class="btn btn-secondary btn-block" onclick="visualizarRelatorio()">
                                👁️ Visualizar Relatório
                            </button>
                        </div>
                        <div class="col-6">
                            <button type="button" class="btn btn-primary btn-block" onclick="gerarRelatorio()">
                                📊 Gerar Relatório
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
                                
                                <h4>Outros Valores:</h4>
                                <p><strong>Aluguel:</strong> R$ <span id="preview-valorAluguel">0,00</span></p>
                                <p><strong>IPTU:</strong> R$ <span id="preview-valorIPTU">0,00</span></p>
                                <p><strong>Condomínio:</strong> R$ <span id="preview-valorCondominio">0,00</span></p>
                                <p class="alert alert-success"><strong>Total Final:</strong> R$ <span id="preview-valorTotalFinal">0,00</span></p>
                            </div>
                        </div>

                        <div class="alert alert-info mt-3">
                            <strong>Verifique os dados acima. Se estiverem corretos, clique em 'Gerar Relatório' para criar o arquivo Word.</strong>
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
                        <small class="text-muted">${cond.endereco}</small>
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
    document.getElementById('btnExcluir').style.display = 'none';
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
    
    if (!nome || !endereco) {
        alert('Por favor, preencha todos os campos!');
        return;
    }
    
    const indexEditando = document.getElementById('btnExcluir').getAttribute('data-index');
    
    if (indexEditando !== null) {
        // Editando
        condominios[indexEditando] = { nome, endereco };
    } else {
        // Novo condomínio
        condominios.push({ nome, endereco });
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
    document.getElementById('btnExcluir').style.display = 'inline-block';
    document.getElementById('btnExcluir').setAttribute('data-index', index);
    
    document.getElementById('modalCondominio').classList.remove('hidden');
}

// EXCLUIR CONDOMÍNIO
function excluirCondominio() {
    const index = document.getElementById('btnExcluir').getAttribute('data-index');
    
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
            
            if (condominioSelecionado && enderecoInput) {
                enderecoInput.value = condominioSelecionado.endereco;
            } else {
                enderecoInput.value = '';
            }
        });
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

    const valorTotalFinal = totalDespesas + totalOutros;

    // Atualizar campos
    const totalDespesasFormatado = totalDespesas.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const totalFinalFormatado = valorTotalFinal.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const totalDespesasInput = document.getElementById('totaldespesas');
    const totalFinalInput = document.getElementById('valorTotalFinal');

    if (totalDespesasInput) totalDespesasInput.value = totalDespesasFormatado;
    if (totalFinalInput) totalFinalInput.value = totalFinalFormatado;
}

// VISUALIZAR RELATÓRIO
function visualizarRelatorio() {
    relatorioData = collectRelatorioFormData();

    // Atualizar preview
    document.getElementById('preview-nomecondominio').textContent = relatorioData.nomecondominio || 'Não informado';
    document.getElementById('preview-enderecoCondominio').textContent = relatorioData.enderecoCondominio || 'Não informado';
    document.getElementById('preview-unidade').textContent = relatorioData.unidade || 'Não informado';
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
        valorAluguel: getValue('valorAluguel'),
        valorIPTU: getValue('valorIPTU'),
        valorCondominio: getValue('valorCondominio'),
        valorTotalFinal: getValue('valorTotalFinal')
    };
}

// GERAR RELATÓRIO - CÓDIGO COMPLETO
async function gerarRelatorio() {
    try {
        if (!relatorioData || Object.keys(relatorioData).length === 0) {
            relatorioData = collectRelatorioFormData();
        }

        console.log('📊 Enviando dados para gerar relatório!', relatorioData);

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
                a.download = `Relatorio_Condominio_${relatorioData.nomecondominio || 'Relatorio'}_${new Date().toISOString().split("T")[0]}.docx`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            };
        }

        // Mostrar seção de download
        document.getElementById('download-section').classList.remove('hidden');

        if (window.app && window.app.showAlert) {
            window.app.showAlert('Relatório gerado com sucesso!', 'success');
        }

    } catch (error) {
        console.error('❌ Erro ao gerar relatório!', error);
        if (window.app && window.app.showAlert) {
            window.app.showAlert('Erro ao gerar relatório! ' + error.message, 'error');
        }
    }
}