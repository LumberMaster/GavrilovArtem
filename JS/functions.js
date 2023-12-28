var Pages = {
    "MyWorks":0,
    "Blog":1,
    "AboutMe":1,
    "Contacts":2
};
var ActivePage = Pages.AboutMe;


function InitAOS(){
    AOS.init({
        duration: 1200,
      });
}
function ReplaceImage(TegImg, url){
    TegImg.setAttribute("src", url);
}  

function replace(htmlText, id) {
    document.getElementById(id).innerHTML = htmlText;
}
function Request(url, type="GET") {
    var xhr = new XMLHttpRequest();
    xhr.open(type, url, false);
    xhr.send();

    if (xhr.status != 200) console.log( xhr.status + ': ' + xhr.statusText );
    else return xhr.responseText;
}
function TestRequest(url, type="GET") {
    var xhr = new XMLHttpRequest();
    xhr.open(type, url, false);
    xhr.send();
    
    if (xhr.status != 200) console.log( xhr.status + ': ' + xhr.statusText ); 
    else return xhr.responseText; 
}
async function Load_MyWork() {

    let Arr = JSON.parse(Request('./Projects/Projects.json')),
    html = '';
    
    console.log(Arr);
    for(key in Arr){
        let project = await JSON.parse(Request(`./Projects/${Arr[key]}/Project.json`));

        if(project['enabled']){
            html += '<div class="Items_projects" data-aos="zoom-in">';
            html += `<h2 align="center" id="h2-project-name-top">${project['formate_name']}</h2>`;
            if(project['img'] != "") {
                html += `
                    <div class="Img_project_div">
                        <img onclick="ChangePage(0, ${key});" src="./Projects/${Arr[key]}/${project['img']}" class="Img_project_img" />
                    </div>
                `;
            }else{
                html += `
                    <div class="Img_project_div">
                        <img onclick="ChangePage(0, ${key});" src="./media/icons/noimage.png" class="Img_project_img"/>
                    </div>
                `;
            }

            html += '<div class="Previe_project_div">';
                html += `<h2 align="center" id="h2-project-name-bottom">${project['name']}</h2>`;
                html += `<p class="Previe_project_p_description">${project['description']}</p>`;
                
                
                
                html += "<div class='Previe_project_urls'>Ссылки |";

                if(project['view'] != "")  
                    html += `<a href="${project['view']}"><img onmouseover="ReplaceImage(this, './media/icons/eye-active.svg');" onmouseout="ReplaceImage(this, './media/icons/eye.svg');" src="./media/icons/eye.svg" class="urls_previe_icon"></a>`;
                if(project['urls']['github'] != "")  
                    html += `<a href="${project['urls']['github']}"><img onmouseover="ReplaceImage(this, './media/logos/github-active.svg');" onmouseout="ReplaceImage(this, './media/logos/github.svg');" src="./media/logos/github.svg" class="urls_previe_icon"></a>`;            html += "|</div>";
            
                // Добавление иконок тегов
                html += "<div class='Previe_project_tags'>ТЕГИ:";
                    if(project['languages']['HTML'])  html += '<img src="./media/logos/html.svg" class="icon-24">';
                    if(project['languages']['CSS']) html += '<img src="./media/logos/css.svg" class="icon-24">';
                    if(project['languages']['JavaScript']) html += '<img src="./media/logos/javascript.svg" class="icon-24">';
                    if(project['languages']['Node.js']) html += '<img src="./media/logos/nodejs.svg" class="icon-24">';
                    if(project['languages']['Python']) html += '<img src="./media/logos/python.svg" class="icon-24">';
                    if(project['languages']['C++']) html += '<img src="./media/logos/c++.svg" class="icon-24">';
                    if(project['languages']['C#']) html += '<img src="./media/logos/csh.svg" class="icon-24">';
                    if(project['languages']['unity']) html += '<img src="./media/logos/unity.svg" class="icon-24">';
                    if(project['languages']['bot']) html += '<img src="./media/icons/bot.svg" class="icon-24">';

                    if(project['devices']['mobile']) html += '<img src="./media/icons/mobile.svg" class="icon-24">';
                    if(project['devices']['compucter']) html += '<img src="./media/icons/desktop.svg" class="icon-24">';

                    html += "</div>";
                html += `<div class="Previe_project_DopInfo">`;
                    html += `<h3 align="left">Версия ${project['version']}</h3>`;
                    html += `<h3 align="center">${project['date']}</h3>`;
                html += `</div>`;

                html += '</div>';

            html += '</div>';
        }
    }
    replace(html,'content__MyWorks');
    
}




function ChangePage(Page, subpage=-1) {
    switch (Page) {
        case 0:
            if(subpage == -1){
                document.getElementById("content").style.display = "none";
                document.getElementById("content__MyWorks").style.display = "flex";
    
                ActivePage = Pages.MyWorks;
                Load_MyWork();
    
                // AOS.refreshHard();

            }else{
                document.getElementById("content").style.display = "block";
                document.getElementById("content__MyWorks").style.display = "none";
                ActivePage = Pages.MyWorks;

                replace(Request(`./Projects/${subpage}/Project.html`,'GET'), 'content');
            }
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