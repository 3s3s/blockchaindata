"use strict";

const $ = require('jquery');
const popup = require("./popup.js")
const utils = require("./utils.js")

let g_LastHash = "";
document.addEventListener('DOMContentLoaded', function() {
    setInterval(() => {
		if (g_LastHash == window.location.hash)
			return;
		
		g_LastHash = window.location.hash;
		OnSiteChanged(g_LastHash.slice(25));		
		}, 1000
	);
	
	SetDefaults();
}, false);

async function OnSiteChanged(txID)
{
    const obj = await utils.GetObjectFromBlockchain(txID);
    
    document.open('text/html');
    
    if (obj.type == 'text')
        document.write(Buffer.from(obj.base64, 'base64').toString('utf8'));
    else
        document.write('<html><body><img src="data:image/jpeg;base64,'+obj.base64+'"/>');
    
    document.close();
}


// handle input changes
/*const input = document.querySelector('input');
input.addEventListener('change', () => {
    console.log(input.files)

    // grab the first file in the FileList object and pass it to the function
    popup.saveFile(input.files[0])
});*/

async function SetDefaults()
{
    popup.UpdateSavedData();
    
    const network = utils.getNetwork();
    
    const url = await utils.GetSettings('rpc_address') || network.url;
    const user = await utils.GetSettings('rpc_user') || network.user;
    const password = await utils.GetSettings('rpc_password') || network.password;
    
    $('#rpc_address').val(url);
    $('#rpc_user').val(user);
    $('#rpc_passsword').val(password);
}

$('#main_form').submit(e => {
    e.preventDefault();
    
    if (!$('#the-file-input')[0].files.length)
        return alert('Please select a file!');
    
    $("html, body").animate({ scrollTop: 0 }, "slow");
    try {
        utils.SetSettings({rpc_address: $('#rpc_address').val()});
        utils.SetSettings({rpc_user: $('#rpc_user').val()});
        utils.SetSettings({rpc_passsword: $('#rpc_passsword').val()});
        
        popup.saveFile($('#the-file-input')[0].files[0])
    }
    catch(e) {
        alert(e.message);
    }
})