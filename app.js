const sujeitos = {
    1: 'Inocente curioso',
    2: 'Criminoso',
    3: 'Pessoa influente (magnata, político…)',
    4: 'Bando cultista',
    5: 'Cultista independente',
    6: 'Ex-agente da Ordo Realitas',
    7: 'Item amaldiçoado',
    8: 'Criatura paranormal' //elemento
}

const elementos = {
    1: 'Sangue',
    2: 'Morte',
    3: 'Conhecimento',
    4: 'Energia'
}

const acoes = {
    1: 'Invocou uma criatura de propósito', //elemento
    2: 'Invocou uma criatura sem querer', //elemento
    3: 'Está sequestrando inocentes',
    4: 'Está assassinando inocentes',
    5: 'Está usando um ritual ou item amaldiçoado para cometer crimes mundanos (roubo, extorsão…)',
    6: 'Está recrutando cultistas',
    7: 'Está pesquisando um ritual perigoso',
    8: 'Está coletando itens amaldiçoados',
    9: 'Matou um agente da Ordo Realitas',
    10: 'Role duas vezes e combine os resultados'
}

const locais = {
    1: 'Escola',
    2: 'Hospital',
    3: 'Vilarejo',
    4: 'Fazenda',
    5: 'Arranha-céu',
    6: 'Grande loja de departamento',
    7: 'Zona industrial da cidade',
    8: 'Shopping center',
    9: 'Orfanato',
    10: 'Museu',
    11: 'Mansão',
    12: 'Navio',
    13: 'Mata fechada',
    14: 'Becos de metrópole',
    15: 'Esgoto',
    16: 'Cemitério',
    17: 'Delegacia ou base militar',
    18: 'Antiga sede da Ordo Realitas',
    19: 'Ilha remota',
    20: 'Role duas vezes e combine os resultados'
}

const habitado = { 1: 'Habitado(a)', 2: 'Abandonado(a)' };

const aliados = {
    1: 'Civil alheio ao paranormal',
    2: 'Civil exposto ao paranormal',
    3: 'Antigo conhecido de um dos agentes (amigo de infância, ex-colega de faculdade ou trabalho, ex-namorado…)',
    4: 'Outro agente da Ordo Realitas'
}

const aposentado = { 1: 'aposentado', 2: 'ativo(a)' }

const objetos = {
    1: 'Equipamento*',
    2: 'Item amaldiçoado*',
    3: 'Equipamento com 1d3–1 modificações*',
    4: 'Ingrediente para um ritual poderoso (máscara ritualística, gema rara…)',
    5: 'Artefato com grande valor para a Ordem (tomo antigo, relíquia ancestral…)',
    6: 'Role duas vezes (ignorando novos resultados “6”)'
}

const tipoObjeto = {
    1: 'arma',
    2: 'arma',
    3: 'arma',
    4: 'proteção',
    5: 'equipamento geral/acessório',
    6: 'equipamento geral/acessório'
}

const eventos = {
    1: 'O aparecimento de uma/outra criatura paranormal de grande poder',
    2: 'A chegada de reforços inimigos',
    3: 'Uma doença paranormal/maldição afetando o aliado',
    4: 'Civis se revoltando contra eles',
    5: 'A revelação de que o aliado era o vilão',
    6: 'A revelação de que as ações do inimigo eram justificadas',
    7: 'Perda de seus equipamentos(por furto, falha tecnológica…)',
    8: 'Ter que proteger um civil',
    9: 'Perda de comunicação com a Ordo Realitas e acesso ao sistema de crédito',
    10: 'Agentes da lei os importunando',
    11: 'Um desastre (incêndio, tempestade, furacão, blecaute, agitação civil…)',
    12: 'O aparecimento de um antigo inimigo',
}

const random = (array) => {
    const keys = Object.keys(array);
    const randomIndex = Math.floor(Math.random() * keys.length);
    const randomKey = keys[randomIndex];
    return [randomKey, array[randomKey]];
}

function novaMissao() {
    let [key, sujeito] = random(sujeitos)
    let [elemento, acao, local, aliado, objeto, evento] = ''

    if (key == 8) {
        [_, elemento] = random(elementos)
        sujeito = sujeito + ' de ' + elemento
    }

    function getAcao() {
        [key, a] = random(acoes)
        if (key == 1) {
            [_, elemento] = random(elementos)
            a = `Invocou uma criatura de ${elemento} de propósito`;
        } else if (key == 2) {
            [_, elemento] = random(elementos)
            a = `Invocou uma criatura de ${elemento} sem querer`;
        }
        return [key, a]
    }
    [key, acao] = getAcao();
    if (key == 10) {
        delete acoes[10];
        [key, acao] = getAcao();
        delete acoes[parseInt(key)];
        let acao2 = '';
        [key, acao2] = getAcao();
        acao = acao + ' e ' + acao2
    }

    function getLocal() {
        [key, l] = random(locais)
        if (key == 1) {
            [_, elemento] = random(elementos)
            l = `Invocou uma criatura de ${elemento} de propósito`;
        } else if (key == 2) {
            [_, elemento] = random(elementos)
            l = `Invocou uma criatura de ${elemento} sem querer`;
        }
        return [key, l]
    }

    function getHabitado(l, key) {
        if (key <= 12) {
            [_, elemento] = random(habitado)
            return l + `(${elemento})`
        }
    }

    [key, local] = getLocal();
    if (key == 20) {
        delete locais[20];
        [key, local] = getLocal();
        if (key <= 12) {
            local = getHabitado(local, key)
        }
        delete locais[parseInt(key)];
        let local2 = '';
        [key, local2] = getLocal();
        if (key <= 12) {
            local2 = getHabitado(local2, key)
        }
        local = local + ' e ' + local2
    }

    [key, aliado] = random(aliados);
    if (key == 4) {
        [_, elemento] = random(aposentado)
        aliado = aliado + `(${elemento})`
    }

    function getObjeto() {
        [key, o] = random(objetos)
        if (key <= 3) {
            [_, elemento] = random(tipoObjeto)
            o = `${elemento}`
        }
        return [key, o]
    }
    [key, objeto] = getObjeto();
    if (key == 6) {
        delete objetos[6];
        [key, objeto] = getObjeto();
        delete objetos[parseInt(key)];
        let objeto2 = '';
        [key, objeto2] = getObjeto();
        objeto = objeto + ' e ' + objeto2
    }

    [_, evento] = random(eventos)

    const inicio = `Um(a) ${sujeito}, ${acao} em um(a) ${local}`;
    const meio = `Durante a investigação o grupo terá a ajuda de um(a) ${aliado} e poderá encontrar um(a) ${objeto}.`;
    const fim = `Porém, em determinado momento os agentes serão surpreendidos pelo(a) ${evento}.`;

    return [inicio, meio, fim];

}

function renderMissao() {
    const [um, dois, tres] = novaMissao();
    document.getElementById('um').innerHTML = um;
    document.getElementById('dois').innerHTML = dois;
    document.getElementById('tres').innerHTML = tres;
}