/**
 * Script: agregar_fotos.js
 *
 * Descripción:
 * Despliega las distintas opciones de región, y las de comuna en base a la región escogida.
 * Verifica que el campo de Región no esté vacío, y que su valor sea alguno de los disponibles
 * en el JSON de regiones disponible en este script.
 * Verifica que el campo de Comuna no esté vacío, y que su valor sea alguno de los disponibles
 * para la región seleccionada en el JSON de regiones disponible en este script.
 * Reinicia el campo de Comuna ante cada cambio de Región.
 *
 * Autor: Matías Vergara S.
 *
 * Importante: El JSON de Regiones se obtuvo desde stackoverflow:
 * // https://es.stackoverflow.com/questions/233409/problema-con-relleno-select-boxes-en-html
 * ... en la pregunta realizada por el usuario M4auriXD, 28 Ene 2019.
 *  Se verificó manualmente que los valores del JSON fuesen correctos.
 *
 * Importante: La implementación es una modificación del código disponible en la fuente mencionada
 * en el punto anterior, en combinación con la respuestas de A. Cedano, 29 Ene 2019.
 */


var regcom =
    `
    {
        "regiones": [
        {
            "nombreRegion": "Región de Tarapacá",
            "comunas": [
                        "Iquique", 
                        "Alto Hospicio", 
                        "Pozo Almonte", 
                        "Camiña", 
                        "Colchane", 
                        "Huara", 
                        "Pica"
                        ]
        },
        {
            "nombreRegion": "Región de Antofagasta",
            "comunas": [
                        "Antofagasta", 
                        "Mejillones", 
                        "Sierra Gorda", 
                        "Taltal", 
                        "Calama", 
                        "Ollagüe", 
                        "San Pedro de Atacama", 
                        "Tocopilla", 
                        "María Elena"
                       ]
        },
        {
            "nombreRegion": "Región de Atacama",
            "comunas": [
                        "Copiapó", 
                        "Caldera", 
                        "Tierra Amarilla", 
                        "Chañaral", 
                        "Diego de Almagro", 
                        "Vallenar", 
                        "Alto del Carmen", 
                        "Freirina", 
                        "Huasco"
                      ]
        },
        {
            "nombreRegion": "Región de Coquimbo",
            "comunas": [
                        "La Serena", 
                        "Coquimbo", 
                        "Andacollo", 
                        "La Higuera", 
                        "Paihuano", 
                        "Vicuña", 
                        "Illapel", 
                        "Canela", 
                        "Los Vilos", 
                        "Salamanca", 
                        "Ovalle", 
                        "Combarbalá", 
                        "Monte Patria", 
                        "Punitaqui", 
                        "Río Hurtado"
                        ]
        },
        {
            "nombreRegion": "Región de Valparaíso",
            "comunas": [
                        "Valparaíso", 
                        "Casablanca", 
                        "Concón", 
                        "Juan Fernández", 
                        "Puchuncaví", 
                        "Quintero", 
                        "Viña del Mar", 
                        "Isla de Pascua", 
                        "Los Andes", 
                        "Calle Larga", 
                        "Rinconada", 
                        "San Esteban", 
                        "La Ligua", 
                        "Cabildo", 
                        "Papudo", 
                        "Petorca", 
                        "Zapallar", 
                        "Quillota", 
                        "Calera", 
                        "Hijuelas", 
                        "La Cruz", 
                        "Nogales", 
                        "San Antonio", 
                        "Algarrobo", 
                        "Cartagena", 
                        "El Quisco", 
                        "El Tabo", 
                        "Santo Domingo", 
                        "San Felipe", 
                        "Catemu", 
                        "Llaillay", 
                        "Panquehue", 
                        "Putaendo", 
                        "Santa María", 
                        "Quilpué", 
                        "Limache", 
                        "Olmué", 
                        "Villa Alemana"
                        ]
        },
        {
            "nombreRegion": "Región del Libertador Bernardo Ohiggins",
            "comunas": [
                        "Rancagua", 
                        "Codegua", 
                        "Coinco", 
                        "Coltauco", 
                        "Doñihue", 
                        "Graneros", 
                        "Las Cabras", 
                        "Machalí", 
                        "Malloa", 
                        "Mostazal", 
                        "Olivar", 
                        "Peumo", 
                        "Pichidegua", 
                        "Quinta de Tilcoco", 
                        "Rengo", 
                        "Requínoa", 
                        "San Vicente", 
                        "Pichilemu", 
                        "La Estrella", 
                        "Litueche", 
                        "Marchihue", 
                        "Navidad", 
                        "Paredones", 
                        "San Fernando", 
                        "Chépica", 
                        "Chimbarongo", 
                        "Lolol", 
                        "Nancagua", 
                        "Palmilla", 
                        "Peralillo", 
                        "Placilla", 
                        "Pumanque", 
                        "Santa Cruz"
                        ]
        },
        {
            "nombreRegion": "Región del Maule",
            "comunas": [
                        "Talca", 
                        "Constitución", 
                        "Curepto", 
                        "Empedrado", 
                        "Maule", 
                        "Pelarco", 
                        "Pencahue", 
                        "Río Claro", 
                        "San Clemente", 
                        "San Rafael", 
                        "Cauquenes", 
                        "Chanco", 
                        "Pelluhue", 
                        "Curicó", 
                        "Hualañé", 
                        "Licantén", 
                        "Molina", 
                        "Rauco", 
                        "Romeral", 
                        "Sagrada Familia", 
                        "Teno", 
                        "Vichuquén", 
                        "Linares", 
                        "Colbún", 
                        "Longaví", 
                        "Parral", 
                        "Retiro", 
                        "San Javier", 
                        "Villa Alegre", 
                        "Yerbas Buenas"
                        ]
        },
        {
            "nombreRegion": "Región del Biobío",
            "comunas": [
                        "Concepción", 
                        "Coronel", 
                        "Chiguayante", 
                        "Florida", 
                        "Hualqui", 
                        "Lota", 
                        "Penco", 
                        "San Pedro de la Paz", 
                        "Santa Juana", 
                        "Talcahuano", 
                        "Tomé", 
                        "Hualpén", 
                        "Lebu", 
                        "Arauco", 
                        "Cañete", 
                        "Contulmo", 
                        "Curanilahue", 
                        "Los Álamos", 
                        "Tirúa", 
                        "Los Ángeles", 
                        "Antuco", 
                        "Cabrero", 
                        "Laja", 
                        "Mulchén", 
                        "Nacimiento", 
                        "Negrete", 
                        "Quilaco", 
                        "Quilleco", 
                        "San Rosendo", 
                        "Santa Bárbara", 
                        "Tucapel", 
                        "Yumbel", 
                        "Alto Biobío", 
                        "Cobquecura", 
                        "Coelemu", 
                        "Ninhue", 
                        "Portezuelo", 
                        "Quirihue", 
                        "Ránquil", 
                        "Treguaco"
                        ]
        },
        {
            "nombreRegion": "Región de la Araucanía",
            "comunas": [
                        "Temuco", 
                        "Carahue", 
                        "Cunco", 
                        "Curarrehue", 
                        "Freire", 
                        "Galvarino", 
                        "Gorbea", 
                        "Lautaro", 
                        "Loncoche", 
                        "Melipeuco", 
                        "Nueva Imperial", 
                        "Padre las Casas", 
                        "Perquenco", 
                        "Pitrufquén", 
                        "Pucón", 
                        "Saavedra", 
                        "Teodoro Schmidt", 
                        "Toltén", 
                        "Vilcún", 
                        "Villarrica", 
                        "Cholchol", 
                        "Angol", 
                        "Collipulli", 
                        "Curacautín", 
                        "Ercilla", 
                        "Lonquimay", 
                        "Los Sauces", 
                        "Lumaco", 
                        "Purén", 
                        "Renaico", 
                        "Traiguén", 
                        "Victoria"
                        ]
        },
        {
            "nombreRegion": "Región de Los Lagos",
            "comunas": [
                        "Puerto Montt", 
                        "Calbuco", 
                        "Cochamó", 
                        "Fresia", 
                        "Frutillar", 
                        "Los Muermos", 
                        "Llanquihue", 
                        "Maullín", 
                        "Puerto Varas", 
                        "Castro", 
                        "Ancud", 
                        "Chonchi", 
                        "Curaco de Vélez", 
                        "Dalcahue", 
                        "Puqueldón", 
                        "Queilén", 
                        "Quellón", 
                        "Quemchi", 
                        "Quinchao", 
                        "Osorno", 
                        "Puerto Octay", 
                        "Purranque", 
                        "Puyehue", 
                        "Río Negro", 
                        "San Juan de la Costa", 
                        "San Pablo", 
                        "Chaitén", 
                        "Futaleufú", 
                        "Hualaihué", 
                        "Palena"
                        ]
        },
        {
            "nombreRegion": "Región Aisén del General Carlos Ibáñez del Campo",
            "comunas": [
                        "Coihaique", 
                        "Lago Verde", 
                        "Aisén", 
                        "Cisnes", 
                        "Guaitecas", 
                        "Cochrane", 
                        "O’Higgins", 
                        "Tortel", 
                        "Chile Chico", 
                        "Río Ibáñez"
                        ]
        },
        {
            "nombreRegion": "Región de Magallanes y de la Antártica Chilena",
            "comunas": [
                        "Punta Arenas", 
                        "Laguna Blanca", 
                        "Río Verde", 
                        "San Gregorio", 
                        "Cabo de Hornos (Ex Navarino)", 
                        "Antártica", 
                        "Porvenir", 
                        "Primavera", 
                        "Timaukel", 
                        "Natales", 
                        "Torres del Paine"
                        ]
        },
        {
            "nombreRegion": "Región Metropolitana de Santiago",
            "comunas": [
                        "Cerrillos", 
                        "Cerro Navia", 
                        "Conchalí", 
                        "El Bosque", 
                        "Estación Central", 
                        "Huechuraba", 
                        "Independencia", 
                        "La Cisterna", 
                        "La Florida", 
                        "La Granja", 
                        "La Pintana", 
                        "La Reina", 
                        "Las Condes", 
                        "Lo Barnechea", 
                        "Lo Espejo", 
                        "Lo Prado", 
                        "Macul", 
                        "Maipú", 
                        "Ñuñoa", 
                        "Pedro Aguirre Cerda", 
                        "Peñalolén", 
                        "Providencia", 
                        "Pudahuel", 
                        "Quilicura", 
                        "Quinta Normal", 
                        "Recoleta", 
                        "Renca", 
                        "San Joaquín", 
                        "San Miguel", 
                        "San Ramón", 
                        "Vitacura", 
                        "Puente Alto", 
                        "Pirque", 
                        "San José de Maipo", 
                        "Colina", 
                        "Lampa", 
                        "Tiltil", 
                        "San Bernardo", 
                        "Buin", 
                        "Calera de Tango", 
                        "Paine", 
                        "Melipilla", 
                        "Alhué", 
                        "Curacaví", 
                        "María Pinto", 
                        "San Pedro", 
                        "Talagante", 
                        "El Monte", 
                        "Isla de Maipo", 
                        "Padre Hurtado", 
                        "Peñaflor"
                        ]
        },
        {
            "nombreRegion": "Región de Los Ríos",
            "comunas": [
                        "Valdivia", 
                        "Corral", 
                        "Lanco", 
                        "Los Lagos", 
                        "Máfil", 
                        "Mariquina", 
                        "Paillaco", 
                        "Panguipulli", 
                        "La Unión", 
                        "Futrono", 
                        "Lago Ranco", 
                        "Río Bueno"
                        ]
        },
        {
            "nombreRegion": "Región de Arica y Parinacota",
            "comunas": [
                        "Arica", 
                        "Camarones", 
                        "Putre", 
                        "Parinacota",
                        "General Lagos"
                        ]
        },
        {
            "nombreRegion": "Región del Ñuble",
            "comunas": [
                        "Bulnes", 
                        "Chillán", 
                        "Chillán Viejo", 
                        "El Carmen", 
                        "Pemuco", 
                        "Pinto", 
                        "Quillón", 
                        "San Ignacio", 
                        "Yungay", 
                        "San Carlos", 
                        "Coihueco", 
                        "Ñiquén", 
                        "San Fabián", 
                        "San Nicolás"
                        ]
        }
    ]
}`;

$(document).ready(function () {
    let json = JSON.parse(regcom);
    let selRegion = $('#select-region');
    let selComuna = $('#select-comuna');
    let jsonRegiones = json.regiones;
    let regionesOpciones = "";

    $.each(jsonRegiones, function (k, v) {
        regionesOpciones += `<option value="${v.nombreRegion}">${v.nombreRegion}</option>`;
    });

    selRegion.append(regionesOpciones)

    //la unica forma de validar estos campos sera asignandolos (en el on).
    selRegion[0].setCustomValidity('Campo vacio o modificado');
    selComuna[0].setCustomValidity('Comuna no seleccionada o modificada');

    $(selRegion).on('change', function () {
        let regionSeleccionada = selRegion[0][selRegion[0].selectedIndex].text;
        selRegion[0].setCustomValidity('Campo vacio o modificado');
        selComuna[0].setCustomValidity('Comuna no seleccionada o modificada');
        if (regionSeleccionada) {
            for (let key in jsonRegiones) {
                if (jsonRegiones[key].nombreRegion === regionSeleccionada) {
                    selRegion[0].setCustomValidity('');
                    selComuna.find("option:not(:first)").remove();
                    let comunaOpciones = "";
                    let jsonComunas = jsonRegiones[key].comunas;
                    $.each(jsonComunas, function (k, v) {
                        comunaOpciones += `<option value="${v}">${v}</option>`;
                    });
                    selComuna.append(comunaOpciones);
                }
            }
        } else {
            selComuna[0].selectedIndex = 0;
        }
    });

    $(selComuna).on('change', function () {
        let regionSeleccionada = selRegion[0][selRegion[0].selectedIndex].text
        selComuna[0].setCustomValidity('Region no indicada, campo vacio o modificado');
        if (regionSeleccionada) {
            let comunaSeleccionada = selComuna[0][selComuna[0].selectedIndex].text;
            for (let key in jsonRegiones) {
                if (jsonRegiones[key].nombreRegion === regionSeleccionada) {
                    for (let keyCom in jsonRegiones[key].comunas) {
                        if (jsonRegiones[key].comunas[keyCom] === comunaSeleccionada) {
                            selComuna[0].setCustomValidity('');
                        }
                    }
                }
            }
        }
    });
});
