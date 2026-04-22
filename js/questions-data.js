/**
 * Question Data for Abdominal Assessment
 * Simplified filenames for reliability.
 */

const questionsData = {
    part1: [
        {
            question: "¿Qué estructura delimita el \"área desnuda\" del hígado superiormente?",
            options: ["Ligamento falciforme", "Ligamento coronario anterior", "Ligamento triangular izquierdo", "Ligamento redondo"],
            correct: 1,
            explanation: "El ligamento coronario (hoja anterior y posterior) delimita esta zona en contacto con el diafragma."
        },
        {
            question: "¿Cuál es el remanente fibroso del conducto venoso fetal?",
            options: ["Ligamento redondo", "Ligamento venoso", "Ligamento falciforme", "Pliegue umbilical medio"],
            correct: 1,
            explanation: "Se localiza en la fisura del ligamento venoso, uniendo la rama izquierda de la porta con la VCI."
        },
        {
            question: "El espacio de Morrison se localiza entre:",
            options: ["Hígado y diafragma", "Hígado y riñón derecho", "Estómago e hígado", "Bazo y riñón izquierdo"],
            correct: 1,
            explanation: "Es el receso hepatorrenal, punto más declive en decúbito supino."
        },
        {
            question: "El límite superior del foramen epiploico es:",
            options: ["Vena cava inferior", "Lóbulo caudado", "Primera porción del duodeno", "Ligamento hepatoduodenal"],
            correct: 1,
            explanation: "El lóbulo caudado (proceso caudado) forma el techo de este orificio."
        },
        {
            question: "¿Qué ligamento contiene a la tríada portal?",
            options: ["Gastrohepático", "Hepatoduodenal", "Falciforme", "Hepatocólico"],
            correct: 1,
            explanation: "Es la porción engrosada del omento menor que forma el borde libre."
        },
        {
            question: "¿Qué estructura divide al hígado en lóbulos anatómicos derecho e izquierdo?",
            options: ["Vena hepática media", "Línea de Cantlie", "Ligamento falciforme", "Fisura portal principal"],
            correct: 2,
            explanation: "Es la división macroscópica basada en la inserción peritoneal."
        },
        {
            question: "El lóbulo caudado corresponde al segmento:",
            options: ["I", "IV", "V", "VIII"],
            correct: 0,
            explanation: "Es el segmento posterior que drena directamente a la VCI."
        },
        {
            question: "La línea de Cantlie se extiende desde la vena cava inferior hasta:",
            options: ["El ligamento redondo", "El ligamento falciforme", "La fosa de la vesícula biliar", "El apéndice fibroso del hígado"],
            correct: 2,
            explanation: "Define la división funcional en porciones derecha e izquierda."
        },
        {
            question: "¿Qué vena hepática divide el sector lateral del sector medial del lóbulo izquierdo?",
            options: ["Vena hepática derecha", "Vena hepática media", "Vena hepática izquierda", "Vena porta izquierda"],
            correct: 2,
            explanation: "Discurre por la fisura umbilical y separa los segmentos II/III del IV."
        },
        {
            question: "El segmento IV se localiza entre:",
            options: ["Fisura umbilical y fosa vesicular", "VCI y ligamento venoso", "Fisura portal derecha y borde hepático", "Cúpula diafragmática y VCI"],
            correct: 0,
            explanation: "Sus límites son el ligamento redondo a la izquierda y la vesícula a la derecha."
        },
        {
            question: "¿Cuál es el origen habitual de la arteria hepática propia?",
            options: ["Tronco celíaco", "Arteria hepática común", "Arteria gastroduodenal", "Arteria mesentérica superior"],
            correct: 1,
            explanation: "Tras dar la arteria gastroduodenal, la hepática común pasa a ser propia."
        },
        {
            question: "La vena porta se forma por la unión de:",
            options: ["Esplénica y mesentérica inferior", "Esplénica y mesentérica superior", "Gástrica izquierda y esplénica", "Mesentérica superior e inferior"],
            correct: 1,
            explanation: "Ocurre a nivel de L2, detrás del cuello del páncreas."
        },
        {
            question: "Una variante anatómica común es la arteria hepática derecha originándose de:",
            options: ["Arteria gástrica izquierda", "Arteria mesentérica superior", "Arteria renal derecha", "Arteria esplénica"],
            correct: 1,
            explanation: "Es una de las variaciones más frecuentes según Gray."
        },
        {
            question: "¿A qué nivel desembocan las venas hepáticas?",
            options: ["Vena porta", "Vena cava inferior", "Vena ácigos", "Atrio derecho"],
            correct: 1,
            explanation: "Drenan directamente en la porción suprahepática de la VCI."
        },
        {
            question: "Las várices esofágicas en hipertensión portal implican a la vena:",
            options: ["Gástrica corta", "Gástrica izquierda", "Gastroepiploica", "Esplénica distal"],
            correct: 1,
            explanation: "Se anastomosa con las venas esofágicas del sistema ácigos."
        },
        {
            question: "El triángulo de Calot quirúrgico tiene como límite lateral al:",
            options: ["Conducto hepático común", "Borde inferior del hígado", "Conducto cístico", "Conducto colédoco"],
            correct: 2,
            explanation: "Está formado por el conducto cístico, el hepático común y el borde hepático."
        },
        {
            question: "¿Dónde se localiza el fondo de la vesícula biliar respecto a la pared abdominal?",
            options: ["7.º espacio intercostal", "Unión del 9.º cartílago costal y línea medioclavicular", "Línea axilar anterior y 10.ª costilla", "Región umbilical"],
            correct: 1,
            explanation: "Es el punto de Murphy anatómico."
        },
        {
            question: "La ampolla de Vater desemboca en:",
            options: ["Primera porción del duodeno", "Papila duodenal menor", "Papila duodenal mayor", "Ángulo de Treitz"],
            correct: 2,
            explanation: "Situada en la cara posteromedial de la 2.ª porción duodenal."
        },
        {
            question: "¿Qué arteria suele cruzar por detrás del conducto hepático común?",
            options: ["Arteria cística", "Arteria hepática derecha", "Arteria gastroduodenal", "Arteria supraduodenal"],
            correct: 1,
            explanation: "Es la relación más frecuente antes de dar la arteria cística."
        },
        {
            question: "El esfínter que rodea la terminación del colédoco se llama:",
            options: ["Esfínter de Boyden", "Esfínter de Oddi", "Esfínter de Lutkens", "Esfínter pilórico"],
            correct: 1,
            explanation: "Controla el paso de bilis y jugo pancreático al duodeno."
        },
        {
            question: "Dolor visceral de la vesícula se transmite inicialmente a:",
            options: ["Región umbilical", "Epigastrio", "Hipocondrio izquierdo", "Fosa ilíaca derecha"],
            correct: 1,
            explanation: "Por fibras que viajan con los nervios esplácnicos mayores (T5-T9)."
        },
        {
            question: "¿Qué estructura es posterior al conducto colédoco en su porción retroduodenal?",
            options: ["Páncreas", "Vena porta", "Arteria gastroduodenal", "Vena cava inferior"],
            correct: 1,
            explanation: "La vena porta mantiene su posición posterior en la tríada."
        },
        {
            question: "El íleo biliar ocurre por una fístula entre la vesícula y:",
            options: ["Colon transverso", "Duodeno", "Estómago", "Yeyuno"],
            correct: 1,
            explanation: "Debido a la proximidad del fondo vesicular con la 1.ª y 2.ª porción duodenal."
        },
        {
            question: "La maniobra de Pringle controla el sangrado comprimiendo el:",
            options: ["Ligamento falciforme", "Ligamento hepatoduodenal", "Omento mayor", "Hiato esofágico"],
            correct: 1,
            explanation: "Ocluye la entrada de sangre arterial y portal al hígado."
        },
        {
            question: "Un absceso hepático en el segmento VII afectaría la cara:",
            options: ["Anterosuperior derecha", "Posterosuperior derecha", "Inferior (visceral)", "Medial izquierda"],
            correct: 1,
            explanation: "El segmento VII es la parte superior y posterior del lóbulo derecho."
        },
        {
            question: "¿Cuál es la unidad funcional basada en el flujo sanguíneo y metabolismo?",
            options: ["Lobulillo clásico", "Ácino hepático", "Lobulillo portal", "Cordón de Remak"],
            correct: 1,
            explanation: "El ácino de Rappaport es la unidad funcional clínica."
        },
        {
            question: "En el ácino hepático, la zona con mayor riesgo de necrosis por isquemia es:",
            options: ["Zona 1", "Zona 2", "Zona 3", "Zona limitante"],
            correct: 2,
            explanation: "Es la más alejada de la arteriola nutricia (perivenosa)."
        },
        {
            question: "¿Qué células almacenan vitamina A en el hígado?",
            options: ["Células de Kupffer", "Hepatocitos", "Células estrelladas", "Colangiocitos"],
            correct: 2,
            explanation: "Se encuentran en el espacio de Disse."
        },
        {
            question: "El drenaje linfático de la cara visceral del hígado se dirige principalmente a:",
            options: ["Nódulos frénicos", "Nódulos celíacos", "Nódulos mediastínicos", "Nódulos paraaórticos"],
            correct: 1,
            explanation: "A través de los nódulos hepáticos situados en el hilio."
        },
        {
            question: "La vesícula biliar carece de una de las siguientes capas:",
            options: ["Mucosa", "Submucosa", "Muscular", "Serosa/Adventicia"],
            correct: 1,
            explanation: "La vesícula no tiene submucosa propia, según Gray."
        },
        {
            question: "¿Qué nervio proporciona la inervación parasimpática al hígado?",
            options: ["Nervio frénico", "Nervio vago", "Nervio esplácnico menor", "Nervio intercostal"],
            correct: 1,
            explanation: "El tronco vagal anterior da ramas para el plexo hepático."
        },
        {
            question: "La impresión renal en el hígado se encuentra en el:",
            options: ["Lóbulo izquierdo", "Lóbulo cuadrado", "Lóbulo derecho (cara visceral)", "Lóbulo caudado"],
            correct: 2,
            explanation: "Es posterior a la impresión colónica."
        },
        {
            question: "¿Qué porción del colédoco se relaciona con la cabeza del páncreas?",
            options: ["Supraduodenal", "Retroduodenal", "Intrapancreática", "Intramural"],
            correct: 2,
            explanation: "Atraviesa o se surca en la cara posterior de la cabeza pancreática."
        },
        {
            question: "El conducto cístico contiene pliegues mucosos llamados:",
            options: ["Válvulas de Kerckring", "Válvulas espirales", "Válvulas de Houston", "Esfínter de Lutkens"],
            correct: 1,
            explanation: "Ayudan a mantener la permeabilidad del conducto."
        },
        {
            question: "La vena hepática media se sitúa en:",
            options: ["Fisura portal derecha", "Fisura umbilical", "Fisura portal principal", "Surco de la VCI"],
            correct: 2,
            explanation: "Es el plano que divide funcionalmente al hígado."
        },
        {
            question: "El ligamento hepatogástrico forma parte del:",
            options: ["Omento mayor", "Omento menor", "Mesenterio", "Ligamento coronario"],
            correct: 1,
            explanation: "Junto con el ligamento hepatoduodenal."
        },
        {
            question: "La \"cabeza de medusa\" se debe a la dilatación de:",
            options: ["Venas esofágicas", "Venas rectales", "Venas paraumbilicales", "Venas lumbares"],
            correct: 2,
            explanation: "Que se anastomosan con las venas epigástricas superficiales."
        },
        {
            question: "¿Qué arteria irriga la parte superior del colédoco?",
            options: ["Arteria gastroduodenal", "Arteria hepática derecha", "Arteria cística", "Arteria pancreatoduodenal superior"],
            correct: 2,
            explanation: "Sueye dar ramas para el conducto cístico y hepático."
        },
        {
            question: "El límite lateral del foramen de Winslow es:",
            options: ["Vena porta", "Vena cava inferior", "El foramen es virtualmente abierto lateralmente", "Lóbulo derecho"],
            correct: 2,
            explanation: "El foramen es una comunicación libre; no tiene límite lateral anatómico."
        },
        {
            question: "¿A qué nivel vertebral se origina el tronco celíaco?",
            options: ["T10", "T12", "L1", "L2"],
            correct: 1,
            explanation: "Justo al pasar el hiato aórtico del diafragma."
        }
    ],
    part2: [
        { src: "ANATOMAGE_1.jpg", answer: "arteria mesentérica superior" },
        { src: "ANATOMAGE_10.jpg", answer: "estomago" },
        { src: "ANATOMAGE_11.jpg", answer: "bazo" },
        { src: "ANATOMAGE_12.jpg", answer: "lumbar posterior" },
        { src: "ANATOMAGE_13.jpg", answer: "riñón izquierdo" },
        { src: "ANATOMAGE_14.jpg", answer: "vena renal izquierda" },
        { src: "ANATOMAGE_15.jpg", answer: "colédoco" },
        { src: "ANATOMAGE_16.jpg", answer: "tronco celiaco" },
        { src: "ANATOMAGE_17.jpg", answer: "vesícula biliar" },
        { src: "ANATOMAGE_18.jpg", answer: "vena mesentérica superior" },
        { src: "ANATOMAGE_19.jpg", answer: "vena esplénica" },
        { src: "ANATOMAGE_2.jpg", answer: "cola" },
        { src: "ANATOMAGE_20.jpg", answer: "transcavidad" },
        { src: "ANATOMAGE_21.jpg", answer: "espacio de Morrison" },
        { src: "ANATOMAGE_22.jpg", answer: "psoas" },
        { src: "ANATOMAGE_23.jpg", answer: "cuadrado lumbar" },
        { src: "ANATOMAGE_24.jpg", answer: "transverso" },
        { src: "ANATOMAGE_25.jpg", answer: "recto abdominal" },
        { src: "ANATOMAGE_26.jpg", answer: "colon transverso" },
        { src: "ANATOMAGE_27.jpg", answer: "colon ascendente" },
        { src: "ANATOMAGE_28.jpg", answer: "psoas" },
        { src: "ANATOMAGE_29.jpg", answer: "iliaco" },
        { src: "ANATOMAGE_3.jpg", answer: "vena cava inferior" },
        { src: "ANATOMAGE_30.jpg", answer: "colon sigmoide" },
        { src: "ANATOMAGE_31.jpg", answer: "apéndice" },
        { src: "ANATOMAGE_32.jpg", answer: "mesenterio" },
        { src: "ANATOMAGE_4.jpg", answer: "aorta abdominal" },
        { src: "ANATOMAGE_5.jpg", answer: "diafragma" },
        { src: "ANATOMAGE_6.jpg", answer: "vena cava inferior" },
        { src: "ANATOMAGE_7.jpg", answer: "arteria hepática propia" },
        { src: "ANATOMAGE_8.jpg", answer: "colédoco" },
        { src: "ANATOMAGE_9.jpg", answer: "hígado" }
    ],
    part3: [
        { src: "IMNORMAL_1.jpg", answer: "Hígado" },
        { src: "IMNORMAL_10.png", answer: "Mesenterio" },
        { src: "IMNORMAL_11.png", answer: "Páncreas" },
        { src: "IMNORMAL_12.png", answer: "Bazo" },
        { src: "IMNORMAL_13.png", answer: "Riñón izquierdo" },
        { src: "IMNORMAL_14.png", answer: "Recto" },
        { src: "IMNORMAL_15.png", answer: "Próstata" },
        { src: "IMNORMAL_16.png", answer: "Vejiga" },
        { src: "IMNORMAL_17.png", answer: "Duodeno" },
        { src: "IMNORMAL_18.png", answer: "Porta" },
        { src: "IMNORMAL_19.png", answer: "Vena mesentérica superior" },
        { src: "IMNORMAL_2.png", answer: "Riñón derecho" },
        { src: "IMNORMAL_20.png", answer: "Vena esplénica" },
        { src: "IMNORMAL_21.png", answer: "Vena cava inferior" },
        { src: "IMNORMAL_22.png", answer: "Aorta abdominal" },
        { src: "IMNORMAL_23.png", answer: "Arteria iliaca común derecha" },
        { src: "IMNORMAL_24.png", answer: "Arteria iliaca común izquierda" },
        { src: "IMNORMAL_25.png", answer: "Vena mesentérica inferior" },
        { src: "IMNORMAL_26.png", answer: "Tronco celiaco" },
        { src: "IMNORMAL_27.png", answer: "Arteria mesentérica superior" },
        { src: "IMNORMAL_28.png", answer: "Aorta descendente" },
        { src: "IMNORMAL_29.png", answer: "Vena Cava inferior" },
        { src: "IMNORMAL_3.png", answer: "Musculo psoas" },
        { src: "IMNORMAL_30.png", answer: "Vena porta" },
        { src: "IMNORMAL_31.png", answer: "Diafragma" },
        { src: "IMNORMAL_32.png", answer: "Estomago" },
        { src: "IMNORMAL_33.png", answer: "Bazo" },
        { src: "IMNORMAL_34.png", answer: "Glándula suprarrenal izquierda" },
        { src: "IMNORMAL_35.png", answer: "Páncreas" },
        { src: "IMNORMAL_36.png", answer: "Píloro" },
        { src: "IMNORMAL_37.png", answer: "Colon sigmoide" },
        { src: "IMNORMAL_4.png", answer: "Vejiga" },
        { src: "IMNORMAL_5.png", answer: "Hígado" },
        { src: "IMNORMAL_6.png", answer: "Estomago" },
        { src: "IMNORMAL_7.png", answer: "Vesícula biliar" },
        { src: "IMNORMAL_8.png", answer: "Ciego" },
        { src: "IMNORMAL_9.png", answer: "Íleon terminal" },
        { src: "IMPATOLOGICA_1.png", answer: "Neumoperitoneo", organ: "Cavidad Peritoneal" },
        { src: "IMPATOLOGICA_10.png", answer: "Litiasis renal bilateral", organ: "Riñones" },
        { src: "IMPATOLOGICA_11.png", answer: "Apendicitis aguda", organ: "Apéndice" },
        { src: "IMPATOLOGICA_12.png", answer: "Apendicitis aguda", organ: "Apéndice" },
        { src: "IMPATOLOGICA_13.png", answer: "Colecistitis aguda", organ: "Vesícula Biliar" },
        { src: "IMPATOLOGICA_14.png", answer: "Aneurisma aórtico abdominal", organ: "Aorta Abdominal" },
        { src: "IMPATOLOGICA_15.png", answer: "Aneurisma aórtico abdominal", organ: "Aorta Abdominal" },
        { src: "IMPATOLOGICA_16.png", answer: "Diverticulitis", organ: "Colon" },
        { src: "IMPATOLOGICA_17.png", answer: "Hernia abdominal", organ: "Pared Abdominal" },
        { src: "IMPATOLOGICA_18.png", answer: "Isquemia mesentérica", organ: "Intestino" },
        { src: "IMPATOLOGICA_19.png", answer: "Ascitis", organ: "Cavidad Peritoneal" },
        { src: "IMPATOLOGICA_2.png", answer: "Válvulas conniventes", organ: "Intestino Delgado" },
        { src: "IMPATOLOGICA_20.png", answer: "Tumor cabeza páncreas", organ: "Páncreas" },
        { src: "IMPATOLOGICA_21.png", answer: "Objeto extraño", organ: "Tubo digestivo" },
        { src: "IMPATOLOGICA_3.png", answer: "Nivel hidroaéreo", organ: "Intestino Delgado" },
        { src: "IMPATOLOGICA_4.png", answer: "Haustras", organ: "Colon" },
        { src: "IMPATOLOGICA_5.png", answer: "Infarto bazo", organ: "Bazo" },
        { src: "IMPATOLOGICA_6.jpg", answer: "Pancreatitis edematosa", organ: "Páncreas" },
        { src: "IMPATOLOGICA_7.jpg", answer: "Colecistitis aguda", organ: "Vesícula Biliar" },
        { src: "IMPATOLOGICA_8.jpg", answer: "Vólvulo Sigmoide", organ: "Colon" },
        { src: "IMPATOLOGICA_9.jpg", answer: "Absceso hepático", organ: "Hígado" }
    ]
};

if (typeof module !== 'undefined') {
    module.exports = questionsData;
}
