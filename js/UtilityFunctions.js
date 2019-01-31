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

function getStyleProperty(codeName) {
   let props = globalConfig.styleProperties;
   for (let i = 0; i < props.length; ++i) {
      if (props[i].codeName == codeName)
         return props[i];
   }
   return null;
}


function getAttributeGroupName(groupValue) {
   let groups = globalConfig.attributeGroups;

   for (let i = 0; i < groups.length; ++i) {
      if (groups[i].value == groupValue)
         return groups[i].name;
   }

   return "Brak grupy";
}

function getAttributeProperty(codeName) {
   let props = globalConfig.attributeProperties;
   for (let i = 0; i < props.length; ++i) {
      if (props[i].codeName == codeName)
         return props[i];
   }
   return null;
}