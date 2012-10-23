hnComments = function(storyId,disableCSS){
var $ = jQuery,
id  = 'hnComments'+$('.hnComments').length,
appId   = 'hnComments',
callback= 'document.getElementById("'+id+'").display',
url     = 'http://hndroidapi.appspot.com/nestedcomments/format/json/id/'+storyId+'?appId='+appId+'&callback='+callback;

var items = function(data,itemsLevel){
    return uiji('.items itemsLevel'+itemsLevel,function(){$(this)
        .uiji({'class':'item',length:data.length},function(index){
            var itemData = data[index];
            
            var comment = itemData.comment.split('\\"').join('"');
            comment = $("<div/>").html(comment).text();
            comment = comment.split('__BR__').join('<br/>');
            
            $(this)
            .uiji({'class':'comment',html:comment})
            .uiji('div',function(){$(this)
                .uiji({tag:'a','class':'meta username',target:'_blank',href:'http://news.ycombinator.com/user?id='+itemData.username,html:itemData.username})
                .uiji({tag:'a','class':'meta reply',target:'_blank',href:'http://news.ycombinator.com/item?id='+itemData.id,html:'reply'})
                .uiji({tag:'span','class':'meta time',html:itemData.time})
            })            
            if(itemData.children.length>0){
            $(this).uiji(items(itemData.children,itemsLevel+1));
            }
        })
    })
}


return uiji({id:id,'class':'hnComments',storyId:storyId},function(){$(this)
    .uiji('.navBar',function(){$(this)
        .uiji('.hnLogo"Y"')
        .uiji({tag:'a','class':'emphasis',href:'http://news.ycombinator.com/item?id='+storyId,html:'Comments From HackerNews'})
        .uiji('.credits',function(){$(this)
        .uiji('span"Widget by "')
        .uiji('a{href=http://aakilfernandes.com}"Aakil Fernandes"')
        .uiji('span", API by "')
        .uiji('a{href=http://http://glebche.appspot.com}"Gleb Popov"')
    })
    })
    .uiji('.comments')
    .uiji({tag:'script',type:'text/javascript',src:url})
    
    $(this)[0].display=function(data){
        var itemsLevel=0;
        $(this).find('.comments')
            .uiji(items(data.items,itemsLevel))
    }
    
})}

