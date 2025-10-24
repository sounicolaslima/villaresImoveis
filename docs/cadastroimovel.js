//===============================================================
// CADASTRO DE IMÓVEL - COMPLETO E CORRIGIDO
//===============================================================

// FUNÇÃO PRINCIPAL PARA CARREGAR A PÁGINA
async function loadCadastroImovelPage() {
    console.log('Carregando página de cadastro de imóvel...');

    const content = document.getElementById('page-content');
    if (!content) {
        console.error('Elemento page-content não encontrado!');
        return;
    }

    content.innerHTML = `
        <div class="page-container">
            <div class="page-header">
                <button class="btn btn-secondary" onclick="goBack()">← VOLTAR</button>
                <h1>🏠 CADASTRO DE IMÓVEL</h1>
                <div id="pipefy-selector"></div>
            </div>

            <div class="main-container">
                <div id="loading" class="alert alert-info">Carregando dados do Pipefy...</div>

                <form id="cadastro-imovel-form">
                    <!-- Seção Valor/Tipo de Negócio -->
                    <div class="section-header">
                        <h3>VALOR / TIPO DE NEGÓCIO</h3>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>Valor (R$)</label>
                                <input type="text" id="valor" class="form-control" placeholder="Ex: 250.000,00">
                            </div>
                        </div>
                        <div class="col-6">
                            <label>Tipo de Negócio</label>
                            <div class="checkbox-group">
                                <div class="checkbox-item">
                                    <input type="checkbox" id="aluguel" checked>
                                    <label for="aluguel">Aluguel</label>
                                </div>
                                <div class="checkbox-item">
                                    <input type="checkbox" id="venda">
                                    <label for="venda">Venda</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Seção Tipo de Imóvel -->
                    <div class="section-header">
                        <h3>TIPO DE IMÓVEL</h3>
                    </div>

                    <div class="checkbox-group">
                        <div class="checkbox-item">
                            <input type="checkbox" id="casa">
                            <label for="casa">Casa</label>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" id="apto">
                            <label for="apto">Apartamento</label>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" id="sitio">
                            <label for="sitio">Sítio</label>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" id="lotes">
                            <label for="lotes">Lotes</label>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" id="outros">
                            <label for="outros">Outros</label>
                        </div>
                    </div>

                    <!-- Dados do Imóvel -->
                    <div class="section-header">
                        <h3>DADOS DO IMÓVEL</h3>
                    </div>

                    <div class="row">
                        <div class="col-4">
                            <div class="form-group">
                                <label>Endereço</label>
                                <input type="text" id="enderecoImovel" class="form-control" placeholder="Rua, Avenida, etc.">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Número</label>
                                <input type="text" id="nImovel" class="form-control" placeholder="123">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Complemento</label>
                                <input type="text" id="compl" class="form-control" placeholder="Apto, Bloco, etc.">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-4">
                            <div class="form-group">
                                <label>Bairro</label>
                                <input type="text" id="bairro" class="form-control" placeholder="Bairro">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Cidade</label>
                                <input type="text" id="cidade" class="form-control" placeholder="Cidade">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>UF</label>
                                <select id="uf" class="form-control">
                                    <option value="">Selecione</option>
                                    <option value="AC">AC</option>
                                    <option value="AL">AL</option>
                                    <option value="AP">AP</option>
                                    <option value="AM">AM</option>
                                    <option value="BA">BA</option>
                                    <option value="CE">CE</option>
                                    <option value="DF">DF</option>
                                    <option value="ES">ES</option>
                                    <option value="GO">GO</option>
                                    <option value="MA">MA</option>
                                    <option value="MT">MT</option>
                                    <option value="MS">MS</option>
                                    <option value="MG">MG</option>
                                    <option value="PA">PA</option>
                                    <option value="PB">PB</option>
                                    <option value="PR">PR</option>
                                    <option value="PE">PE</option>
                                    <option value="PI">PI</option>
                                    <option value="RJ">RJ</option>
                                    <option value="RN">RN</option>
                                    <option value="RS">RS</option>
                                    <option value="RO">RO</option>
                                    <option value="RR">RR</option>
                                    <option value="SC">SC</option>
                                    <option value="SP">SP</option>
                                    <option value="SE">SE</option>
                                    <option value="TO">TO</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- Características do Imóvel - DETALHADA -->
                    <div class="section-header">
                        <h3>CARACTERÍSTICAS DO IMÓVEL</h3>
                    </div>

                    <div class="row">
                        <div class="col-3">
                            <div class="form-group">
                                <label>Quartos</label>
                                <input type="number" id="quartos" class="form-control" placeholder="Ex: 3">
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="form-group">
                                <label>Suítes</label>
                                <input type="number" id="suites" class="form-control" placeholder="Ex: 1">
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="form-group">
                                <label>Banheiros</label>
                                <input type="number" id="banheiros" class="form-control" placeholder="Ex: 2">
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="form-group">
                                <label>Salas</label>
                                <input type="number" id="salas" class="form-control" placeholder="Ex: 2">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-3">
                            <div class="form-group">
                                <label>Cozinhas</label>
                                <input type="number" id="cozinhas" class="form-control" placeholder="Ex: 1">
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="form-group">
                                <label>Copas</label>
                                <input type="number" id="copas" class="form-control" placeholder="Ex: 1">
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="form-group">
                                <label>Vagas Garagem</label>
                                <input type="number" id="vagas" class="form-control" placeholder="Ex: 2">
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="form-group">
                                <label>Área Total (m²)</label>
                                <input type="text" id="areaTotal" class="form-control" placeholder="Ex: 150">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-3">
                            <div class="form-group">
                                <label>Área Construída (m²)</label>
                                <input type="text" id="areaConstruida" class="form-control" placeholder="Ex: 120">
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="form-group">
                                <label>Revestimento</label>
                                <input type="text" id="revestimento" class="form-control" placeholder="Tipo de revestimento">
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="form-group">
                                <label>Esquadrilha</label>
                                <input type="text" id="esquadrilha" class="form-control" placeholder="Tipo de esquadrilha">
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="form-group">
                                <label>Piso</label>
                                <input type="text" id="piso" class="form-control" placeholder="Tipo de piso">
                            </div>
                        </div>
                    </div>

                    <!-- Características Adicionais -->
                    <div class="section-header">
                        <h3>CARACTERÍSTICAS ADICIONAIS</h3>
                    </div>

                    <div class="row">
                        <div class="col-4">
                            <label>Quintal</label>
                            <div class="checkbox-group">
                                <div class="checkbox-item">
                                    <input type="checkbox" id="quintalSim">
                                    <label for="quintalSim">Sim</label>
                                </div>
                                <div class="checkbox-item">
                                    <input type="checkbox" id="quintalNao">
                                    <label for="quintalNao">Não</label>
                                </div>
                            </div>
                        </div>

                        <div class="col-4">
                            <label>Área de Serviço</label>
                            <div class="checkbox-group">
                                <div class="checkbox-item">
                                    <input type="checkbox" id="areaServicoSim">
                                    <label for="areaServicoSim">Sim</label>
                                </div>
                                <div class="checkbox-item">
                                    <input type="checkbox" id="areaServicoNao">
                                    <label for="areaServicoNao">Não</label>
                                </div>
                            </div>
                        </div>

                        <div class="col-4">
                            <div class="form-group">
                                <label>Situação</label>
                                <select id="situacao" class="form-control">
                                    <option value="">Selecione</option>
                                    <option value="novo">Novo</option>
                                    <option value="usado">Usado</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- CARACTERÍSTICAS DO IMÓVEL / INFRAESTRUTURA -->
                    <div class="section-header">
                        <h3>CARACTERÍSTICAS DO IMÓVEL / INFRAESTRUTURA</h3>
                    </div>

                    <div class="checkbox-container">
                        <div class="row">
                            <div class="col-3">
                                <div class="checkbox-item">
                                    <input type="checkbox" id="interfone">
                                    <label for="interfone">Interfone</label>
                                </div>
                                <div class="checkbox-item">
                                    <input type="checkbox" id="lavabo">
                                    <label for="lavabo">Lavabo</label>
                                </div>
                                <div class="checkbox-item">
                                    <input type="checkbox" id="despensa">
                                    <label for="despensa">Despensa</label>
                                </div>
                                <div class="checkbox-item">
                                    <input type="checkbox" id="dce">
                                    <label for="dce">DCE</label>
                                </div>
                                <div class="checkbox-item">
                                    <input type="checkbox" id="varanda">
                                    <label for="varanda">Varanda</label>
                                </div>
                                <div class="checkbox-item">
                                    <input type="checkbox" id="rouparia">
                                    <label for="rouparia">Rouparia</label>
                                </div>
                                <div class="checkbox-item">
                                    <input type="checkbox" id="box">
                                    <label for="box">Box Despejo</label>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="checkbox-item">
                                    <input type="checkbox" id="areaPriv">
                                    <label for="areaPriv">Área Privativa</label>
                                </div>
                                <div class="checkbox-item">
                                    <input type="checkbox" id="ArmQuarto">
                                    <label for="ArmQuarto">Arm. Quarto</label>
                                </div>
                                <div class="checkbox-item">
                                    <input type="checkbox" id="armCozinha">
                                    <label for="armCozinha">Arm. Cozinha</label>
                                </div>
                                <div class="checkbox-item">
                                    <input type="checkbox" id="boxBanheiro">
                                    <label for="boxBanheiro">Box Banheiro</label>
                                </div>
                                <div class="checkbox-item">
                                    <input type="checkbox" id="arealazer">
                                    <label for="arealazer">Área de Lazer</label>
                                </div>
                                <div class="checkbox-item">
                                    <input type="checkbox" id="closet">
                                    <label for="closet">Closet</label>
                                </div>
                                <div class="checkbox-item">
                                    <input type="checkbox" id="salaGinastica">
                                    <label for="salaGinastica">Sala Ginástica</label>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="checkbox-item">
                                    <input type="checkbox" id="churrasqueira">
                                    <label for="churrasqueira">Churrasqueira</label>
                                </div>
                                <div class="checkbox-item">
                                    <input type="checkbox" id="AQsOLAR">
                                    <label for="AQsOLAR">Aquec. Solar</label>
                                </div>
                                <div class="checkbox-item">
                                    <input type="checkbox" id="Aggas">
                                    <label for="Aggas">Aquec. Gás</label>
                                </div>
                                <div class="checkbox-item">
                                    <input type="checkbox" id="aquecEletrico">
                                    <label for="aquecEletrico">Aquec. Elétrico</label>
                                </div>
                                <div class="checkbox-item">
                                    <input type="checkbox" id="porteiroFisico">
                                    <label for="porteiroFisico">Porteiro Físico</label>
                                </div>
                                <div class="checkbox-item">
                                    <input type="checkbox" id="sauna">
                                    <label for="sauna">Sauna</label>
                                </div>
                                <div class="checkbox-item">
                                    <input type="checkbox" id="piscina">
                                    <label for="piscina">Piscina</label>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="checkbox-item">
                                    <input type="checkbox" id="sala_de_jogos">
                                    <label for="sala_de_jogos">Salão de Jogos</label>
                                </div>
                                <div class="checkbox-item">
                                    <input type="checkbox" id="salaoFests">
                                    <label for="salaoFests">Salão de Festas</label>
                                </div>
                                <div class="checkbox-item">
                                    <input type="checkbox" id="numerodepavimentos">
                                    <label for="numerodepavimentos">Nº Pavimentos</label>
                                </div>
                                <div class="checkbox-item">
                                    <input type="checkbox" id="numeroapto">
                                    <label for="numeroapto">Nº Apto/Andar</label>
                                </div>
                                <div class="checkbox-item">
                                    <input type="checkbox" id="garagem">
                                    <label for="garagem">Garagem L/t</label>
                                </div>
                                <div class="checkbox-item">
                                    <input type="checkbox" id="nelevador">
                                    <label for="nelevador">Nº Elevador</label>
                                </div>
                                <div class="checkbox-item">
                                    <input type="checkbox" id="playground">
                                    <label for="playground">Playground</label>
                                </div>
                                <div class="checkbox-item">
                                    <input type="checkbox" id="quadra">
                                    <label for="quadra">Quadra Esportes</label>
                                </div>
                                <div class="checkbox-item">
                                    <input type="checkbox" id="AREACLARIDAD">
                                    <label for="AREACLARIDAD">Área Claridade</label>
                                </div>
                                <div class="checkbox-item">
                                    <input type="checkbox" id="SACADA">
                                    <label for="SACADA">Sacada</label>
                                </div>
                                <div class="checkbox-item">
                                    <input type="checkbox" id="salaTV">
                                    <label for="salaTV">Sala de TV</label>
                                </div>
                                <div class="checkbox-item">
                                    <input type="checkbox" id="escritorio">
                                    <label for="escritorio">Escritório</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- INFORMAÇÕES ADICIONAIS -->
                    <div class="section-header">
                        <h3>INFORMAÇÕES ADICIONAIS</h3>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>Visitas (Dias/Horários)</label>
                                <input type="text" id="visitas" class="form-control" placeholder="Ex: Segunda a Sexta, 14h-18h">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>Meio de Divulgação</label>
                                <input type="text" id="meioDivulgacao" class="form-control" placeholder="Ex: Site, Jornal, etc.">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-4">
                            <div class="form-group">
                                <label>IPTU</label>
                                <input type="text" id="iptu" class="form-control" placeholder="Valor do IPTU">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Valor Condomínio (R$)</label>
                                <input type="text" id="valorCond" class="form-control" placeholder="Ex: 300,00">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Metragem Frente</label>
                                <input type="text" id="metFrente" class="form-control" placeholder="Ex: 10m">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>Topografia</label>
                                <input type="text" id="topografia" class="form-control" placeholder="Ex: Plano">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>Referência/Localização</label>
                                <input type="text" id="referencia" class="form-control" placeholder="Ponto de referência">
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Observações</label>
                        <textarea id="observacoes" class="form-control" rows="3" placeholder="Informações adicionais sobre o imóvel"></textarea>
                    </div>

                    <!-- Dados do Proprietário -->
                    <div class="section-header">
                        <h3>DADOS DO PROPRIETÁRIO</h3>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>Nome Completo</label>
                                <input type="text" id="nomeProprietario" class="form-control" placeholder="Nome completo">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>CPF</label>
                                <input type="text" id="cpfProprietario" class="form-control" placeholder="000.000.000-00">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>RG</label>
                                <input type="text" id="rgProprietario" class="form-control" placeholder="RG">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>E-mail</label>
                                <input type="email" id="emailProprietario" class="form-control" placeholder="email@exemplo.com">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>Endereço</label>
                                <input type="text" id="enderecoProprietario" class="form-control" placeholder="Endereço do proprietário">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>Número</label>
                                <input type="text" id="numeroProprietario" class="form-control" placeholder="Nº">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-4">
                            <div class="form-group">
                                <label>Complemento</label>
                                <input type="text" id="complementoProprietario" class="form-control" placeholder="Complemento">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Bairro</label>
                                <input type="text" id="bairroProprietario" class="form-control" placeholder="Bairro">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Cidade</label>
                                <input type="text" id="cidadeProprietario" class="form-control" placeholder="Cidade">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-4">
                            <div class="form-group">
                                <label>UF</label>
                                <input type="text" id="ufProprietario" class="form-control" placeholder="UF" maxlength="2">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Telefone Fixo</label>
                                <input type="text" id="telefoneProprietario" class="form-control" placeholder="(35) 3821-0000">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Celular</label>
                                <input type="text" id="celularProprietario" class="form-control" placeholder="(35) 99999-0000">
                            </div>
                        </div>
                    </div>

                    <!-- Data e Captador -->
                    <div class="section-header">
                        <h3>DATA E CAPTADOR</h3>
                    </div>

                    <div class="row">
                        <div class="col-4">
                            <div class="form-group">
                                <label>Dia</label>
                                <input type="text" id="dia" class="form-control" placeholder="DD" value="${new Date().getDate()}">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Mês</label>
                                <input type="text" id="mes" class="form-control" placeholder="MM" value="${new Date().getMonth() + 1}">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label>Ano</label>
                                <input type="text" id="ano" class="form-control" placeholder="AAAA" value="${new Date().getFullYear()}">
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Nome do Captador</label>
                        <input type="text" id="nomeCaptador" class="form-control" placeholder="Seu nome">
                    </div>

                    <!-- Situação das Chaves -->
                    <div class="section-header">
                        <h3>SITUAÇÃO DAS CHAVES</h3>
                    </div>

                    <div class="row">
                        <div class="col-4">
                            <div class="form-group">
                                <label>Quantidade de Chaves</label>
                                <input type="number" id="qtdChaves" class="form-control" value="1" min="0" max="10">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="checkbox-item">
                                <input type="checkbox" id="copiaVillares">
                                <label for="copiaVillares">Cópia Villares Imóveis</label>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="checkbox-item">
                                <input type="checkbox" id="copiaProprietario">
                                <label for="copiaProprietario">Cópia do Proprietário</label>
                            </div>
                        </div>
                    </div>

                    <!-- Botão de gerar documento -->
                    <div class="row mt-3">
                        <div class="col-12 text-center">
                            <button type="button" class="btn btn-primary btn-block" onclick="gerarCadastroImovel()">
                                🏠 GERAR FICHA DE CAPTAÇÃO
                            </button>
                        </div>
                    </div>
                </form>

                <div id="download-section-cadastro" class="hidden mt-3">
                    <div class="alert alert-success text-center">
                        ✅ Ficha gerada com sucesso!
                    </div>
                    <button id="download-btn-cadastro" class="btn btn-primary btn-block">
                        📥 BAIXAR FICHA DE CAPTAÇÃO
                    </button>
                </div>
            </div>
        </div>
    `;

    await loadPipefyDataCadastro();
}

// FUNÇÃO PRINCIPAL CORRIGIDA
async function gerarCadastroImovel() {
    console.log('🏠 Gerando cadastro de imóvel...');

    try {
        const formData = collectCadastroImovelFormData();

        console.log('Dados do formulário coletados:', formData);

        const response = await fetch('/api/gerar-documento/cadastro-imovel', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        });

        console.log('Status da resposta:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro no servidor: ${response.status} - ${errorText}`);
        }

        const blob = await response.blob();
        console.log('Tamanho do blob:', blob.size, 'bytes');

        if (blob.size === 0) {
            throw new Error('Arquivo vazio recebido do servidor');
        }

        const url = window.URL.createObjectURL(blob);
        console.log('URL criada:', url);

        const downloadBtn = document.getElementById('download-btn-cadastro');
        if (downloadBtn) {
            downloadBtn.onclick = () => {
                console.log('Iniciando download...');
                const a = document.createElement('a');
                a.href = url;
                a.download = 'Ficha_Captacao_Imovel.docx';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
                console.log('Download concluído');
            };
        }

        const downloadSection = document.getElementById('download-section-cadastro');
        if (downloadSection) {
            downloadSection.classList.remove("hidden");
        }

        if (window.app && window.app.showAlert) {
            window.app.showAlert('Ficha de captação gerada com sucesso!', 'success');
        }
    } catch (error) {
        console.error('❌ Erro ao gerar cadastro:', error);
        if (window.app && window.app.showAlert) {
            window.app.showAlert(`Erro ao gerar ficha: ${error.message}`, 'error');
        }
    }
}

// FUNÇÃO COLETAR DADOS CORRIGIDA (COMPLETA)
function collectCadastroImovelFormData() {
    // CORREÇÃO: Garantir que todos os campos tenham valores padrão
    const getValue = (id, defaultValue = "") => {
        const element = document.getElementById(id);
        return element ? (element.value || defaultValue) : defaultValue;
    };

    const getChecked = (id) => {
        const element = document.getElementById(id);
        return element ? element.checked : false;
    };

    const getCheckedValue = (idTrue, idFalse) => {
        return getChecked(idTrue) ? "Sim" : "Não";
    };

    return {
        // Valor e tipo
        "valor": getValue('valor'),
        "aluguel": getChecked('aluguel') ? "X" : "",
        "venda": getChecked('venda') ? "X" : "",
        
        // Tipo de imóvel
        "casa": getChecked('casa') ? "X" : "",
        "Apto": getChecked('apto') ? "X" : "",
        "Sitio": getChecked('sitio') ? "X" : "",
        "Lotes": getChecked('lotes') ? "X" : "",
        "outros": getChecked('outros') ? "X" : "",
        
        // Dados do imóvel
        "enderecoImovel": getValue('enderecoImovel'),
        "nImovel": getValue('nImovel'),
        "compl": getValue('compl'),
        "bairroImovel": getValue('bairro'),
        "cidadeImovel": getValue('cidade'),
        "UFImovel": getValue('uf'),
        
        // Características detalhadas
        "quartoImovel": getValue('quartos'),
        "suiteImovel": getValue('suites'),
        "cozinhaImovel": getValue('cozinhas'),
        "ATimovel": getValue('areaTotal'),
        "salaImovel": getValue('salas'),
        "copaImovel": getValue('copas'),
        "banheiroImovel": getValue('banheiros'),
        "ACimovel": getValue('areaConstruida'),
        "Quintal": getCheckedValue('quintalSim', 'quintalNao'),
        "GaragemImovel": getValue('vagas'),
        "areaServImovel": getCheckedValue('areaServicoSim', 'areaServicoNao'),
        "revestimento": getValue('revestimento'),
        "esquadrilha": getValue('esquadrilha'),
        "piso": getValue('piso'),
        "situacao": getValue('situacao'),
        "visitas": getValue('visitas'),
        "divulgacao": getValue('meioDivulgacao'),
        "IPTU": getValue('iptu'),
        "localizacao": getValue('referencia'),
        "observacoes": getValue('observacoes'),
        
        // Características do imóvel (checkboxes)
        "interfone": getChecked('interfone'),
        "areaPriv": getChecked('areaPriv'),
        "churrasqueira": getChecked('churrasqueira'),
        "sala_de_jogos": getChecked('sala_de_jogos'),
        "lavabo": getChecked('lavabo'),
        "ArmQuarto": getChecked('ArmQuarto'),
        "AQsOLAR": getChecked('AQsOLAR'),
        "salaoFests": getChecked('salaoFests'),
        "despensa": getChecked('despensa'),
        "armCozinha": getChecked('armCozinha'),
        "Aggas": getChecked('Aggas'),
        "numerodepavimentos": getChecked('numerodepavimentos'),
        "DCE": getChecked('dce'),
        "boxBanheiro": getChecked('boxBanheiro'),
        "aquecEletrico": getChecked('aquecEletrico'),
        "numeroapto": getChecked('numeroapto'),
        "varanda": getChecked('varanda'),
        "arealazer": getChecked('arealazer'),
        "porteiroFisico": getChecked('porteiroFisico'),
        "garagem": getChecked('garagem'),
        "rouparia": getChecked('rouparia'),
        "closet": getChecked('closet'),
        "sauna": getChecked('sauna'),
        "nelevador": getChecked('nelevador'),
        "box": getChecked('box'),
        "salaGinastica": getChecked('salaGinastica'),
        "piscina": getChecked('piscina'),
        "escritorio": getChecked('escritorio'),
        "AREACLARIDAD": getChecked('AREACLARIDAD'),
        "playground": getChecked('playground'),
        "salaTV": getChecked('salaTV'),
        "SACADA": getChecked('SACADA'),
        "quadra": getChecked('quadra'),
        "valorCond": getValue('valorCond'),
        "metFrente": getValue('metFrente'),
        "topografia": getValue('topografia'),

        // Dados do proprietário
        "nomeProprietario": getValue('nomeProprietario'),
        "enderecoProprietario": getValue('enderecoProprietario'),
        "numeroProprietario": getValue('numeroProprietario'),
        "complementoProprietario": getValue('complementoProprietario'),
        "bairroProprietario": getValue('bairroProprietario'),
        "cidadeProprietario": getValue('cidadeProprietario'),
        "UFProprietario": getValue('ufProprietario'),
        "CpfProprietario": getValue('cpfProprietario'),
        "RGProprietario": getValue('rgProprietario'),
        "emailProprietario": getValue('emailProprietario'),
        "telefoneProprietario": getValue('telefoneProprietario'),
        "celularProprietario": getValue('celularProprietario'),

        // Data e captador
        "dia": getValue('dia'),
        "mes": getValue('mes'),
        "ano": getValue('ano'),
        "nomeCaptador": getValue('nomeCaptador'),

        // Chaves
        "qtdChaves": getValue('qtdChaves', '1'),
        "copiaVillares": getChecked('copiaVillares'),
        "copiaProprietario": getChecked('copiaProprietario')
    };
}

// CARREGAR DADOS DO PIPEFY
async function loadPipefyDataCadastro() {
    try {
        const loading = document.getElementById('loading');
        const cards = await window.app.loadPipefyCards();

        if (loading) loading.classList.add('hidden');

        if (cards.length > 0) {
            const selectorContainer = document.getElementById('pipefy-selector');
            if (selectorContainer) {
                const selector = window.app.createCardSelector(cards, (card) => {
                    fillCadastroFormWithCardData(card);
                });
                selectorContainer.appendChild(selector);
            }
        }
    } catch (error) {
        console.error("Erro ao carregar dados do Pipefy:", error);
        const loading = document.getElementById('loading');
        if (loading) loading.classList.add('hidden');
    }
}

// PREENCHER FORMULÁRIO COM DADOS DO PIPEFY
function fillCadastroFormWithCardData(cardData) {
    console.log('🎯 Preenchendo formulário de cadastro com dados do Pipefy...');
    
    const dados = cardData.dadosPreenchidos;
    let camposPreenchidos = 0;

    // Para CADA campo que veio mapeado do Pipefy
    Object.keys(dados).forEach(campo => {
        const valor = dados[campo];
        const input = document.getElementById(campo);
        
        // Se o campo EXISTE no formulário, preenche
        if (input && valor && valor !== "") {
            input.value = valor;
            camposPreenchidos++;
            console.log(`✅ ${campo}: ${valor}`);
        }
    });

    console.log(`🎉 ${camposPreenchidos} campos preenchidos no cadastro`);
    
    if (camposPreenchidos > 0) {
        if (window.app && window.app.showAlert) {
            window.app.showAlert(`${camposPreenchidos} campos preenchidos automaticamente!`, 'success');
        }
    }
    
    return camposPreenchidos;
}

