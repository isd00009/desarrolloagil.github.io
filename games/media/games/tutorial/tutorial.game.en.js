// ---------------------------------------------------------------------------
// Edit this file to define your game. It should have at least four
// sets of content: undum.game.situations, undum.game.start,
// undum.game.qualities, and undum.game.init.
// ---------------------------------------------------------------------------

/* A unique id for your game. This is never displayed. I use a UUID,
 * but you can use anything that is guaranteed unique (a URL you own,
 * or a variation on your email address, for example). */
undum.game.id = "b8641640-99ff-11ec-8bc2-0800200c9a66"; // GEnerado por http://www.famkruithof.net/uuid/uuidgen

/* A string indicating what version of the game this is. Versions are
 * used to control saved-games. If you change the content of a game,
 * the saved games are unlikely to work. Changing this version number
 * prevents Undum from trying to load the saved-game and crashing. */
undum.game.version = "1.0";

// En modo depuración, que no haya efectos de jquery
jQuery.fx.off = false

var numEdades = 6;
var visitado = new Array(numEdades).fill(false);

var cont = 0;

var nombre="Link";
var aux;
aux=prompt("Introduzca un nombre para el personaje:");

if(aux!=null && aux!=""){
	nombre=aux;
} 


/* The situations that the game can be in. Each has a unique ID. */
undum.game.situations = {
    start: new undum.SimpleSituation(
        "<h1>Praga</h1>\
        <p> <img src='./media/img/praga.webp' class='float_right' width='300' height='200'>\
        Te acabas de despertar en un callejón de la encantadora ciudad de Praga, aún desconocido para ti. Allí, una luz extraña se muestra ante tu presencia.\
        Tú, aún sufriendo las consecuencias de la noche anterior, no puedes evitar sentirte atraído por ella y decides acercarte. \
        El misterio no para de acrecentarse cuando en latín pone en la puerta de donde nace la luz cegadora: \
        <br><i><center>Sed fugit interea, fugit irreparabile tempus.</center></i></br></p>\
        <p>Una pena que te saltaras las clases de latín, corre y <a href='./googlear'>googlealo.</a></p>", {

        actions: {
            googlear: function (character, system, action) {
                system.setQuality("progreso", character.qualities.progreso + 12.5);
                window.open("https://translate.google.com/?hl=es&sl=la&tl=es&text=Sed%20fugit%20interea%2C%20fugit%20irreparabile%20tempus&op=translate", "_blank");
                system.doLink("llaves");
            }
        }
    }

    ),

    llaves: new undum.SimpleSituation(
        "<h1>LLaves</h1>\
        <p> <img src='./media/img/llave.png' class='float_right' width='300' height='200'>\
        Gracias a la generosa traducción de Google, has llegado a la conclusión de que estás ante un portal espacio-temporal que te permitirá viajar\
        a través del tiempo y el espacio. Tristemente, no todo es tan fácil, para conseguirlo necesitarás encontrar la llave que lo abra.\
        Ve a buscar la llave a <a href='torrepolvora'> la Torre de la Pólvora</a> o <a href='museolego'> al museo Lego</a>. \
        </p>"
    ),

    torrepolvora: new undum.SimpleSituation(
        "<h1>Torre de la Pólvora</h1>\
        <p> <img src='./media/img/torre.jpg' class='float_right' width='300' height='200'> \
        Te encuentras en la Torre de la Pólvora, una de las más grandes de la ciudad. \
        En la entrada, unos transeúntes te piden que les saques una foto con la Torre; al hacerlo, te da tiempo a visualizar la belleza de la torre que ante ti se alza.\
        Igualmente, aquí no vas a encontrar la llave. Prueba en <a href='museolego'> el museo lego</a>. </p>"
    ),

    museolego: new undum.SimpleSituation(
        "<h1>Museo Lego</h1>\
        <p> <img src='./media/img/lego.jpg' class='float_right' width='300' height='200'>\
        Te encuentras en el Museo Lego, pasas un buen rato fascinado por aquel mundo compuesto por bloquecitos de colores. Realmente \
        es un museo digno de visitar. Tristemente, no es eso lo que te acontece aquí y durante tu visita tampoco has divisado la misteriosa llave.\
        Tras este desengaño, decides: <a href='rendirse'>rendirte</a>, o <a href='mirardetalladamente'> mirar detalladamente. </a></p>"
    ),

    rendirse: new undum.SimpleSituation(
        "<h1>Rendición</h1>\
        <p> <img src='./media/img/rendicion.jpg' class='float_right' width='300' height='200'>\
        Tras una larga y desesperada busqueda, no encuentras la llave. \
        Te quedas con la sensación de que no hay nada que hacer y tomas la mísera decisión de abandonar. Ya nunca conocerás los misterios del universo de tu propia mano.\
       <h1>FIN</h1></p>"
    ),

    mirardetalladamente: new undum.SimpleSituation(
        "<h1>Mirar Detalladamente</h1>\
        <p> <img src='./media/img/detalladamente.jpg' class='float_right' width='300' height='200'> \
        Sabia decisión la de mirar detalladamente ha sido. Tras una larga y agotadora busqueda, descubres un brillo desentonando entre el admirado \
        <i>Halcón Milenario</i>. ¡Sí! Es la llave, lo conseguiste. Tus increíbles dotes de detective y tu incansable lucha te han abierto el portal para descubrir el universo.\
        <a href='./llave'>coge la llave </a> y  <a href='./entrar'> ve al portal. </a>\
        </p>", {
        actions: {
            'llave': function (character, system, action) {
                system.setQuality("progreso", character.qualities.progreso + 12.5);
                system.setQuality("llave", true);
            },
            'entrar': function (character, system, action) {
                if (character.qualities.llave) {
                    system.doLink("portal");
                } else {
                    system.write("<p>Te has olvidado de coger la llave, cógela y ve hacia el portal</p>");
                }
            }

        }
    }
    ),

    portal: new undum.SimpleSituation(
        "<h1>Portal</h1>\
        <p><img src='./media/img/tardis.webp' class='float_right' width='300' height='200'>\
        El portal, una vez usas la llave, se abre ante ti dándote numerosas opciones:\
        <li><a href='eramesozoica'> Era Mesozoica </a></li>\
        <li><a href='prehistoria'> Prehistoria </a></li>\
        <li><a href='edadantigua'> Edad Antigua </a></li>\
        <li><a href='edadmedia'> Edad Media </a></li>\
        <li><a href='edadmoderna'> Edad Moderna </a></li>\
        <li><a href='edadcontemporanea'> Edad Contemporanea </a></li>\ </p>"

    ),

    portalaux: new undum.SimpleSituation(
        "<h1>Portal</h1>\
        <p><img src='./media/img/tardis.webp' class='float_right' width='300' height='200'>\
        Has vuelto al portal, escoge un nuevo escenario: \
        <br><li><a href='eramesozoica'> Era Mesozoica </a></li>\
        <li><a href='prehistoria'> Prehistoria </a></li>\
        <li><a href='edadantigua'> Edad Antigua </a></li>\
        <li><a href='edadmedia'> Edad Media </a></li>\
        <li><a href='edadmoderna'> Edad Moderna </a></li>\
        <li><a href='edadcontemporanea'> Edad Contemporanea </a></li>\ </p>", {
        enter: function (character, system, from) {
            if (cont == 6) {
                system.doLink("fin");
            }
        }
    }
    ),

    eramesozoica: new undum.SimpleSituation(
        "<h1>Era Mesozoica</h1>\
       <p><div align='centre'><video src='./media/img/Dinos.mp4' width='400' height='200' autoplay muted ></video></div> </p>\
       <p> </p>\
       <p>Has escogido conocer a los dinosaurios, una vez allí, quedas encantado con el paisaje aún sin contaminación y la forma de vida de estos animales.\
       Tristemente, sabes que en unos años morirán debido al meteorito que impactó contra el planeta Tierra, dejando una atmósfera contaminada y un cráter denominado Chicxulub.\
       No puedes evitar pensar en lo trágico que eso sería, y en un arrebato de adrenalina, decides tomar un pequeño grupo de velocirraptores bebés y llevarlos al futuro, evitando así su total extinción.\
       Ahora la sociedad del presente convive con velocirraptores gracias a ti, durante unas décadas, ellos fueron nuestro mejor medio de transporte y evitaste la contaminación que los restantes medios de transporte provocan al medio.\
       No obstante, ellos también evolucionaron y descubrieron que la carne humana era todo un manjar, por tu culpa la especie humana se extinguió allá por 2089. Corre, viaja a otro momento para evitar la extinción de la especie humana.\
       <a href='portalaux'> Vuelve al portal. </a>\
       </p>", {
        enter: function (character, system, from) {
            if (visitado[0] == false) {
                system.setQuality("progreso", character.qualities.progreso + 12.5);
                visitado[0] = true;
                cont++;
            }
        }
    }

    ),

    prehistoria: new undum.SimpleSituation(
        "<h1>Prehistoria</h1>\
        <p><img src='./media/img/prehistoria.jpg' class='float_right' width='400' height='200'>\
        Gran elección, quieres sabes si los libros de historia y los documentales de la 2 te mienten sobre esta época tan lejana. Estás en Indonesia, concretamente en Isla de Flores\
        Esperabas encontrarte con tribus de homínidos caníbales y bárbaros, pero en lugar de esto, descubres un lugar que pasaría desapercibido en la famosa villa de Hobbiton, situada en la Comarca.\
        Estos homínidos resultan ser los Homo Floresiensis, también conocidos por parecer hobbits. Aunque tenian una peculiaridad reseñable, vivían en sociedad y se alimentaban de las flores allí nacidas,\
        igual es por esto que su tamaño no pasaba de un metro de altura y 25 kilogramos de peso. ¡Has descubierto que parte de nuestros antepasados homínidos eran veganos!.\
        <a href='portalaux'> Vuelve al portal. </a></p>", {
        enter: function (character, system, from) {
            if (visitado[1] == false) {
                system.setQuality("progreso", character.qualities.progreso + 12.5);
                visitado[1] = true;
                cont++;
            }
        }
    }

    ),

    edadantigua: new undum.SimpleSituation(
        "<h1>Edad Antigua</h1>\
        <p><img src='./media/img/antigua.png' class='float_right' width='300' height='200'>\
        Estás en la famosa metrópoli de Alejandría, decides pasear para ver qué te depara el destino aquí en el año 323 a.C. Ves una tasca con apariencia lujosa y decides entrar, al fondo hay un grupo de señores entre los que\
        se encuentra un rostro que por alguna razón te resulta familiar, es el formidable Alejandro Magno, rey de Macedonia, hegemón de Grecia, faraón de Egipto, Gran rey de Media y Persia y fundador de aquella encantadora ciudad.\
        Como bien suele decirse, las cosas de palacio van despacio, así que ahí estaba él, bebiendo y resolviendo tranquilamente sus conflictos de estado. Consigues acercarte y tomas una copa de vino con él, ese que tanto le gusta, pero\
        a ti de disgustaba enormemente, no comprendes cómo alguien de su compustura bebía algo tan desagradable. <br> Pensándolo fríamente, decides que un hombre de tal grandeza merece tomar\
        alcohol bueno, de ese que solías tomar en Kharma y en tus fiestas en Praga y por si fuera poco, tienes una máquina del tiempo.<br>\
        Has decidido llevarle vodka, Alejandro no puede estar más agradecido, admiró tanto ese brebaje que no supo cuando cesar de beber. Fue la biología la que le hizo parar, concretamente su corazón.\
        Mataste a Alejandro Magno, en consecuencia el vodka se considera una droga ilegal en todo el mundo. ¿De dónde salieron pues las botellas que el hegemón de Grecia bebió?\
        <a href='portalaux'> Vuelve al portal. </a></p>", {
        enter: function (character, system, from) {
            if (visitado[2] == false) {
                system.setQuality("progreso", character.qualities.progreso + 12.5);
                visitado[2] = true;
                cont++;
            }
        }
    }

    ),

    edadmedia: new undum.SimpleSituation(
        "<h1>Edad Media</h1>\
        <p><img src='./media/img/media.jpg' class='float_right' width='255' height='300'>\
        Has llegado a Florencia en su época de máximo esplendor renacentista, todo un lujo. Se te ocurre una idea para cambiar el presente y contribuir al desarrollo de la humanidad, decides\
        llevarle al ingenioso artista Leonardo Da Vinci, un libro con la explicación detallada de la fabricación de un coche moderno, qué osadia por tu parte. Él, te lo agradece aún sin comprender\
        qué era eso exactamente, decidiste ayudarle a desentrañar ese extraño libro con tu casi nulo conocimiento de mecánica. De repente ocurre algo inesperado, un golpe en el armario del anfitrión.\
        <p class='dialogo'>- ¿Quién anda ahí? </p>Preguntais tu amigo Leo y tú al unísono.<p> Cuando sale del armario tu hermano pequeño, le preguntas:</p> <p class='dialogo'>- ¿Cómo has llegado tú aquí?</p> <p class='dialogo'>- ¿Qué hay "+ nombre +"?  \
        Solo venía a hablar con el gran Da Vinci\
        para un trabajo de historia. </p>\
        <p>Al parecer, dándole ese libro a una mente tan radiante, se inventó el automóvil siglos antes de lo que de no ser por ti habría sido y gracias a esto, en tu presente\
        existen los viajes en el espacio-tiempo como algo totalmente accesible y rutinario. No sabemos hasta qué punto es eso maravilloso...\
        <a href='portalaux'> Vuelve al portal. </a></p>", {
        enter: function (character, system, from) {
            if (visitado[3] == false) {
                system.setQuality("progreso", character.qualities.progreso + 12.5);
                visitado[3] = true;
                cont++;
            }
        }
    }
    ),

    edadmoderna: new undum.SimpleSituation(
        "<h1>Edad Moderna</h1>\
        <p><img src='./media/img/moderna.webp' class='float_right' width='300' height='200'>\
        Has llegado hasta los Balcanes en el año 1550, donde se está aconteciendo la guerra habsburgo-otomana. En la que participan la dinastía de Habsburgo y el imperio Otomano.\
        Esta guerra duraría unos 270 años dejando miles y miles de muertos a su paso. Estar ahí te hacía sentir partícipe de la atrocidad de la guerra, quieres ayudar, pero a la vista está\
        que tú no eres precisamente un gran guerrero. Finalmente, recuerdas aquella pelea con tu mejor amigo, y cómo te disculpaste, ese kebab os supo a gloria y nunca más volvisteis a discutir.\
        Tenías que intentarlo, decides llevar kebabs a los altos cargos con la condición de que se sienten a hablar sobre lo ocurrido, ellos, obnubilados por la explosión de sabor en sus paladares,\
        deciden poner fin a esta guerra 241 años antes de lo previsto y apropiarse de esa magnífica comida que nombraron plato principal de su gastronomía nacional hasta hoy día.\
        <a href='portalaux'> Vuelve al portal. </a></p>", {
        enter: function (character, system, from) {
            if (visitado[4] == false) {
                system.setQuality("progreso", character.qualities.progreso + 12.5);
                visitado[4] = true;
                cont++;
            }
        }
    }
    ),

    edadcontemporanea: new undum.SimpleSituation(
        "<h1>Edad Contemporanea</h1>\
        <p><img src='./media/img/contemporanea.webp' class='float_right' width='300' height='200'>\
        Estás en el frente occidental, contemplando la conocida tregua de navidad que data de la primera guerra mundial. Un momento tan mágico como solo la navidad puede serlo en el que soldados alemanes\
         y británicos olvidaron sus diferencias tras la trinchera para cantar villancicos y jugar al fútbol como compañeros. Dado un momento tan tierno, decides unirte a ellos, te apetece una partidilla.\
         Al parecer, no solo tú tuviste la idea de unirte, también lo hizo el glorioso Diego Armando Maradona, que no sabemos porqué, pero allí se hallaba.\
          Todo fue muy divertido hasta que conseguiste hacerle un caño al todopoderoso del fútbol, que no le resultó nada agradable, entrasteis en una pelea. \
          Por tu culpa los soldados recordaron sus misiones y volvieron a sus trincheras, acabaste con un precioso momento.\
        <a href='portalaux'> Vuelve al portal. </a></p>", {
        enter: function (character, system, from) {
            if (visitado[5] == false) {
                system.setQuality("progreso", character.qualities.progreso + 12.5);
                visitado[5] = true;
                cont++;
            }
        }
    }
    ),
    fin: new undum.SimpleSituation(
        "<h1>Fin</h1>\
        <p>Has conseguido recorrer todos los posibles escenarios de la historia, y has descubierto una gran cantidad de cosas interesantes.</p>\
        <h1>¡ENHORABUENA!</h1>"
    )

};

undum.game.start = "start";

undum.game.qualities = {
    llave: new undum.OnOffQuality(
        "Llave", { priority: "0001", group: 'inventario', onDisplay: "&#10003;" }
    ),
    progreso: new undum.NumericQuality(
        "Progreso", { priority: "0001", group: 'inventario' }
    )
};

undum.game.qualityGroups = {
    inventario: new undum.QualityGroup('Inventario', { priority: "0001" })
};

undum.game.init = function (character, system) {
    system.setQuality("llave", false)
    character.qualities.progreso = 0;
    system.setCharacterText("<p>¡Comienzas tu fascinante aventura!</p>");
};