function stripHTML(html)
{
   var tmp = document.createElement("div");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}

function getStyleGroupName(groupValue) {
   let groups = globalConfig.styleGroups;

   for (let i = 0; i < groups.length; ++i) {
      if (groups[i].value == groupValue)
         return groups[i].name;
   }

   return "Brak grupy";
}

function getStyleProperty(styleName) {
   let props = globalConfig.styleProperties;
   for (let i = 0; i < props.length; ++i) {
      if (props[i].styleName == styleName)
         return props[i];
   }
   return null;
}