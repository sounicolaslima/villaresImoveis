//===============================================================
// RECIBO DE ALUGUEL - COMPLETO E CORRIGIDO
//===============================================================

let reciboData = [];

// FUNÇÃO PRINCIPAL PARA CARREGAR A PÁGINA
async function loadReciboAluguelPage() {
    const content = document.getElementById('page-content');

    content.innerHTML = `
        <div class="page-container">
            <div class="page-header">
                <button class="btn btn-secondary" onclick="goBack()">← VOLTAR</button>
                <h1>💰 RECIBO DE ALUGUEL</h1>
                <div id="pipefy-selector"></div>
            </div>

            <div class="main-container">
                <div id="loading" class="alert alert-info">Carregando dados do Pipefy...</div>

                <form id="recibo-aluguel-form">
                    <div class="section-header">
                        <h3>DADOS DO RECIBO</h3>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>Locatário(a)</label>
                                <input type="text" id="nomeLocatario" class="form-control" placeholder="Nome completo do locatário">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>Endereço do imóvel</label>
                                <input type="text" id="enderecoImovel" class="form-control" placeholder="Endereço completo do imóvel">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-4">
                            <div class="form-group">
                                <label>Período de:</label>
                                <input type="text" id="inicioPeriodo" class="form-control" placeholder="dd/mm/aaaa" >
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Até:</label>
                                <input type="text" id="finalPeriodo" class="form-control" placeholder="dd/mm/aaaa" >
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Vencimento:</label>
                                <input type="text" id="vencimento" class="form-control" placeholder="dd/mm/aaaa" >
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-4">
                            <div class="form-group">
                                <label>Limite Pagamento:</label>
                                <input type="text" id="limitePagamento" class="form-control" placeholder="dd/mm/aaaa" >
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Data do Recibo:</label>
                                <input type="text" id="data" class="form-control" placeholder="dd/mm/aaaa">>
                            </div>
                        </div>
                    </div>

                    <div class="section-header">
                        <h3>VALORES</h3>
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
                                <label>Valor Água (R$):</label>
                                <input type="text" id="valorAgua" class="form-control money" value="0,00">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Valor Luz (R$):</label>
                                <input type="text" id="valorLuz" class="form-control money" value="0,00">
                            </div>
                        </div>
                    </div>
                    <div class="row">
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
                        <div class="col-4">
                            <div class="form-group">
                                <label>Valor Multa (R$):</label>
                                <input type="text" id="valorMulta" class="form-control money" value="0,00">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>Desconto (R$):</label>
                                <input type="text" id="desconto" class="form-control money" value="0,00">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>Valor Total (R$):</label>
                                <input type="text" id="valorTotal" class="form-control" value="0,00" readonly style="background-color: #f8f9fa; font-weight: bold;">
                            </div>
                        </div>
                    </div>

                    <!-- Botões -->
                    <div class="row mt-3">
                        <div class="col-6">
                            <button type="button" class="btn btn-secondary btn-block" onclick="visualizarRecibo()">
                                👁️ Visualizar Recibo
                            </button>
                        </div>
                        <div class="col-6">
                            <button type="button" class="btn btn-primary btn-block" onclick="gerarRecibo()">
                                💰 Gerar Recibo
                            </button>
                        </div>
                    </div>
                </form>

                <!-- Visualização do Recibo -->
                <div id="visualizacao-recibo" class="hidden mt-3">
                    <div class="section-header">
                        <h3>👁️ VISUALIZAÇÃO DO RECIBO</h3>
                    </div>
                    <div class="form-container">
                        <div class="row">
                            <div class="col-6">
                                <h4>Dados do Recibo:</h4>
                                <p><strong>Locatário:</strong> <span id="preview-nomeLocatario"></span></p>
                                <p><strong>Endereço:</strong> <span id="preview-enderecoImovel"></span></p>
                                <p><strong>Período:</strong> <span id="preview-periodo"></span></p>
                                <p><strong>Vencimento:</strong> <span id="preview-vencimento"></span></p>
                                <p><strong>Limite Pag.:</strong> <span id="preview-limitePagamento"></span></p>
                                <p><strong>Data Recibo:</strong> <span id="preview-data"></span></p>
                            </div>
                            <div class="col-6">
                                <h4>Valores:</h4>
                                <p><strong>Aluguel:</strong> R$ <span id="preview-valorAluguel">0,00</span></p>
                                <p><strong>Água:</strong> R$ <span id="preview-valorAgua">0,00</span></p>
                                <p><strong>Luz:</strong> R$ <span id="preview-valorLuz">0,00</span></p>
                                <p><strong>IPTU:</strong> R$ <span id="preview-valorIPTU">0,00</span></p>
                                <p><strong>Condomínio:</strong> R$ <span id="preview-valorCondominio">0,00</span></p>
                                <p><strong>Multa:</strong> R$ <span id="preview-valorMulta">0,00</span></p>
                                <p><strong>Desconto:</strong> R$ <span id="preview-desconto">0,00</span></p>
                                <p class="alert alert-success"><strong>TOTAL:</strong> R$ <span id="preview-valorTotal">0,00</span></p>
                            </div>
                        </div>

                        <div class="alert alert-info mt-3">
                            <strong>Verifique os dados acima. Se estiverem corretos, clique em 'Gerar Recibo' para criar o arquivo Word.</strong>
                        </div>
                    </div>
                </div>

                <!-- Download -->
                <div id="download-section" class="hidden mt-3">
                    <div class="alert alert-success text-center">
                        ✅ Recibo gerado com sucesso!
                    </div>
                    <button id="download-btn" class="btn btn-primary btn-block">
                        📥 BAIXAR RECIBO
                    </button>
                </div>
            </div>
        </div>
    `;

    // Configurar eventos
    setupReciboEventListeners();

    // Carregar dados do Pipefy
    await loadPipefyDataRecibo();
}

// CONFIGURAR EVENT LISTENERS
function setupReciboEventListeners() {
    const campos = [
        'valorAluguel', 'valorAgua', 'valorLuz', 'valorIPTU',
        'valorCondominio', 'valorMulta', 'desconto'
    ];
    
    campos.forEach(campo => {
        const input = document.getElementById(campo);
        if (input) {
            input.addEventListener('input', calcularTotal);
            input.addEventListener('blur', formatarMoeda);
        }
    });

    // Calcular total inicial
    calcularTotal();
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
}

// CALCULAR TOTAL
function calcularTotal() {
    const valores = [
        'valorAluguel', 'valorAgua', 'valorLuz', 'valorIPTU',
        'valorCondominio', 'valorMulta', 'desconto'
    ];

    let total = 0;

    valores.forEach(campo => {
        const input = document.getElementById(campo);
        if (!input) return;

        let valor = input.value || '0';
        valor = valor.replace('R$', '').replace(/\./g, '').replace(',', '.').trim();

        const valorNumerico = parseFloat(valor) || 0;

        if (campo === 'desconto') {
            total -= valorNumerico;
        } else {
            total += valorNumerico;
        }
    });

    total = Math.max(0, total);

    const totalFormatado = total.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const totalInput = document.getElementById('valorTotal');
    if (totalInput) {
        totalInput.value = totalFormatado;
    }
}

// VISUALIZAR RECIBO
function visualizarRecibo() {
    reciboData = collectReciboFormData();

    // Atualizar preview
    document.getElementById('preview-nomeLocatario').textContent = reciboData.nomeLocatario || 'Não informado';
    document.getElementById('preview-enderecoImovel').textContent = reciboData.enderecoImovel || 'Não informado';
    document.getElementById('preview-periodo').textContent = `${reciboData.inicioPeriodo || 'Não informado'} a ${reciboData.finalPeriodo || 'Não informado'}`;
    document.getElementById('preview-vencimento').textContent = reciboData.vencimento || 'Não informado';
    document.getElementById('preview-limitePagamento').textContent = reciboData.limitePagamento || 'Não informado';
    document.getElementById('preview-data').textContent = reciboData.data || 'Não informado';

    document.getElementById('preview-valorAluguel').textContent = reciboData.valorAluguel || '0,00';
    document.getElementById('preview-valorAgua').textContent = reciboData.valorAgua || '0,00';
    document.getElementById('preview-valorLuz').textContent = reciboData.valorLuz || '0,00';
    document.getElementById('preview-valorIPTU').textContent = reciboData.valorIPTU || '0,00';
    document.getElementById('preview-valorCondominio').textContent = reciboData.valorCondominio || '0,00';
    document.getElementById('preview-valorMulta').textContent = reciboData.valorMulta || '0,00';
    document.getElementById('preview-desconto').textContent = reciboData.desconto || '0,00';
    document.getElementById('preview-valorTotal').textContent = reciboData.valorTotal || '0,00';

    // Mostrar visualização
    document.getElementById('visualizacao-recibo').classList.remove('hidden');
}

// CARREGAR DADOS DO PIPEFY
async function loadPipefyDataRecibo() {
    try {
        const loading = document.getElementById('loading');
        if (loading) loading.classList.add('hidden');

        const cards = await window.app.loadPipefyCards();

        if (cards.length > 0) {
            const selectorContainer = document.getElementById('pipefy-selector');
            if (selectorContainer) {
                const selector = window.app.createCardSelector(cards, (card) => {
                    fillReciboFormWithCardData(card);
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

// PREENCHER FORMULÁRIO COM DADOS DO PIPEFY - CORRIGIDO
function fillReciboFormWithCardData(cardData) {
    const dados = cardData.dadosPreenchidos || cardData;
    let camposPreenchidos = 0;

    // Preencher NOME DO LOCATÁRIO
    const nomeLocatario = dados['nomeLocatario'];
    if (nomeLocatario && nomeLocatario !== "" && nomeLocatario !== null && nomeLocatario !== undefined) {
        const inputNome = document.getElementById('nomeLocatario');
        if (inputNome) {
            inputNome.value = nomeLocatario;
            camposPreenchidos++;
        }
    }

    // Preencher ENDEREÇO DO IMÓVEL (usando enderecoLocatario)
    const enderecoImovel = dados['enderecoLocatario'];
    if (enderecoImovel && enderecoImovel !== "" && enderecoImovel !== null && enderecoImovel !== undefined) {
        const inputEndereco = document.getElementById('enderecoImovel');
        if (inputEndereco) {
            inputEndereco.value = enderecoImovel;
            camposPreenchidos++;
        }
    }

    // Preencher VALOR DO ALUGUEL
    const valorLocacao = dados['valorLocacaoMensal'];
    if (valorLocacao && valorLocacao !== "" && valorLocacao !== null && valorLocacao !== undefined) {
        const inputValor = document.getElementById('valorAluguel');
        if (inputValor && !inputValor.value) {
            // Extrair apenas números do valor (ex: "5000(CINCO MIL REAIS)" -> "5000")
            const valorNumerico = valorLocacao.match(/\d+/g);
            if (valorNumerico && valorNumerico[0]) {
                inputValor.value = valorNumerico[0] + ',00';
                camposPreenchidos++;
            }
        }
    }

    // Recalcular totais
    setTimeout(calcularTotal, 500);
    
    if (camposPreenchidos > 0 && window.app && window.app.showAlert) {
        window.app.showAlert(`${camposPreenchidos} campos preenchidos automaticamente!`, 'success');
    }
    
    return camposPreenchidos;
}

// GERAR RECIBO
async function gerarRecibo() {
    try {
        if (!reciboData || Object.keys(reciboData).length === 0) {
            reciboData = collectReciboFormData();
        }

        const response = await fetch('/api/gerar-documento/recibo-aluguel', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(reciboData)
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

        const downloadBtn = document.getElementById('download-btn');
        if (downloadBtn) {
            downloadBtn.onclick = () => {
                const a = document.createElement('a');
                a.href = url;
                a.download = `Recibo_${reciboData.nomeLocatario || 'Recibo'}_${new Date().toISOString().split("T")[0]}.docx`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            };
        }

        document.getElementById('download-section').classList.remove('hidden');

        if (window.app && window.app.showAlert) {
            window.app.showAlert('Recibo gerado com sucesso!', 'success');
        }

    } catch (error) {
        console.error('Erro ao gerar recibo!', error);
        if (window.app && window.app.showAlert) {
            window.app.showAlert('Erro ao gerar recibo! ' + error.message, 'error');
        }
    }
}

// COLETAR DADOS DO FORMULÁRIO
function collectReciboFormData() {
    const getValue = (id) => {
        const element = document.getElementById(id);
        return element ? element.value : "";
    };

    return {
        nomeLocatario: getValue('nomeLocatario'),
        enderecoImovel: getValue('enderecoImovel'),
        inicioPeriodo: getValue('inicioPeriodo'),
        finalPeriodo: getValue('finalPeriodo'),
        vencimento: getValue('vencimento'),
        limitePagamento: getValue('limitePagamento'),
        valorAluguel: getValue('valorAluguel'),
        valorAgua: getValue('valorAgua'),
        valorLuz: getValue('valorLuz'),
        valorIPTU: getValue('valorIPTU'),
        valorCondominio: getValue('valorCondominio'),
        valorMulta: getValue('valorMulta'),
        desconto: getValue('desconto'),
        valorTotal: getValue('valorTotal'),
        data: getValue('data')
    };
}