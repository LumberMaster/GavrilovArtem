function InitAOS(){
    AOS.init({
        duration: 1200,
      });
}
  

function replace(htmlText, id) {
    document.getElementById(id).innerHTML = htmlText;
}
function Request(url, type="GET") {
    // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
    xhr.open(type, url, false);

    // 3. Отсылаем запрос
    xhr.send();

    // 4. Если код ответа сервера не 200, то это ошибка
    if (xhr.status != 200) {
        // обработать ошибку
        console.log( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
    } else {
        // вывести результат
        return xhr.responseText; // responseText -- текст ответа.
    }
}
function TestRequest(url, type="GET") {
    // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
    xhr.open(type, url, false);

    // 3. Отсылаем запрос
    xhr.send();

    // 4. Если код ответа сервера не 200, то это ошибка
    if (xhr.status != 200) {
        // обработать ошибку
        console.log( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
    } else {
        // вывести результат
        return xhr.responseText; // responseText -- текст ответа.
    }
}
function Load_MyWork() {

    let Arr = JSON.parse(Request('./JSON/Projects.json')),
        html = '';
    
    console.log(Arr);
    for(key in Arr){
        if(Arr[key]['enabled']){
            html += '<div class="Items_projects" data-aos="zoom-in">';
            html += `<h2 align="center" id="h2-project-name-top">${Arr[key]['formate_name']}</h2>`;
            if(Arr[key]['img'] != "") {
                html += `
                    <div class="Img_project_div">
                        <img src="${Arr[key]['img']}" class="Img_project_img" />
                    </div>
                `;
            }else{
                html += `
                    <div class="Img_project_div">
                        <img src="./media/icons/noimage.png" class="Img_project_img"/>
                    </div>
                `;
            }

            html += '<div class="Previe_project_div">';
                html += `<h2 align="center" id="h2-project-name-bottom">${Arr[key]['name']}</h2>`;
                html += `<p class="Previe_project_p_description">${Arr[key]['description']}</p>`;
                
                
                
                html += "<div class='Previe_project_urls'>Ссылки |";
                    if(Arr[key]['view'] != "")  html += `<a href="${Arr[key]['view']}"><img src="./media/icons/eye.svg" class="urls_previe_icon"></a>`;
                    if(Arr[key]['urls']['github'] != "")  html += `<a href="${Arr[key]['urls']['github']}"><img src="./media/logos/github.svg" class="urls_previe_icon"></a>`;            html += "|</div>";
                // Добавление иконок тегов
                    html += "<div class='Previe_project_tags'>ТЕГИ:";
                        if(Arr[key]['languages']['HTML'])  html += '<img src="./media/logos/html.svg" class="icon-24">';
                        if(Arr[key]['languages']['CSS']) html += '<img src="./media/logos/css.svg" class="icon-24">';
                        if(Arr[key]['languages']['JavaScript']) html += '<img src="./media/logos/javascript.svg" class="icon-24">';
                        if(Arr[key]['languages']['Node.js']) html += '<img src="./media/logos/nodejs.svg" class="icon-24">';
                        if(Arr[key]['languages']['Python']) html += '<img src="./media/logos/python.svg" class="icon-24">';
                        if(Arr[key]['languages']['C++']) html += '<img src="./media/logos/c++.svg" class="icon-24">';
                        if(Arr[key]['languages']['C#']) html += '<img src="./media/logos/csh.svg" class="icon-24">';
                        if(Arr[key]['languages']['unity']) html += '<img src="./media/logos/unity.svg" class="icon-24">';
                        if(Arr[key]['languages']['bot']) html += '<img src="./media/icons/bot.svg" class="icon-24">';

                        if(Arr[key]['devices']['mobile']) html += '<img src="./media/icons/mobile.svg" class="icon-24">';
                        if(Arr[key]['devices']['compucter']) html += '<img src="./media/icons/desktop.svg" class="icon-24">';

                    html += "</div>";
                html += `<div class="Previe_project_DopInfo">`;
                    html += `<h3 align="left">Версия ${Arr[key]['version']}</h3>`;
                    html += `<h3 align="center">${Arr[key]['date']}</h3>`;
                html += `</div>`;

                html += '</div>';

            html += '</div>';
        }
    }
    replace(html,'content__MyWorks');
    
}


var Pages = {
        "MyWorks":0,
        "Blog":1,
        "AboutMe":2,
        "Contacts":3
    };
var ActivePage = Pages.AboutMe;

function ChangePage(Page) {
    switch (Page) {
        case 0:
            document.getElementById("content").style.display = "none";
            document.getElementById("content__MyWorks").style.display = "flex";

            ActivePage = Pages.MyWorks;
            Load_MyWork();

            // AOS.refreshHard();
            break;
        case 1:
            document.getElementById("wrapper__content").innerHTML = 
                `<div id="content"   data-aos="fade-up">
        
                </div>
        
                <div id="content__MyWorks">
        
                </div>`;

            document.getElementById("content__MyWorks").style.display = "none";
            document.getElementById("content").style.display = "block";

            ActivePage = Pages.Blog;
            replace(Request('./templates/Blog/html.html','GET'), 'content');

            // AOS.refreshHard();
            break;
        case 2:
            document.getElementById("wrapper__content").innerHTML = 
                `<div id="content"  data-aos="fade-up">
        
                </div>
        
                <div id="content__MyWorks">
        
                </div>`;

            document.getElementById("content__MyWorks").style.display = "none";
            document.getElementById("content").style.display = "block";

            ActivePage = Pages.AboutMe;
            replace(Request('./templates/AboutMe/html.html','GET'), 'content');

            // AOS.refreshHard();
            break;
        case 3:
            document.getElementById("wrapper__content").innerHTML = 
                `<div id="content"   data-aos="fade-up">
        
                </div>
        
                <div id="content__MyWorks">
        
                </div>`;

            document.getElementById("content__MyWorks").style.display = "none";
            document.getElementById("content").style.display = "block";

            ActivePage = Pages.Contacts;
            replace(Request('./templates/Contacts/html.html','GET'), 'content');

            // AOS.refreshHard();
            break;

        default:
            console.log("Данной странички не существует!");
            break;
    }

    let buttons = document.getElementsByClassName("button_menu");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.cssText = `.button_menu:hover {
            color: #cc7b1e;
            border: 2px solid #cc7b1e;
        }
        .button_menu::after {
            color: #f09023;
            border: 2px solid #f09023;
        }`;

        //buttons[i].style.color = "#a79258";
        //buttons[i].style.borderColor = "#a79258";

        //console.log(buttons[i].style.cssText);
        //buttons[i].style.hover.color = "#cc7b1e";
        //buttons[i].style.hover.borderColor = "#cc7b1e";
    }

    buttons[Page].style.color = "#f09023";
    buttons[Page].style.borderColor = "#f09023";
}