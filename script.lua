s = _G.Key or ""
if game:HttpGet("https://WEBSITENAME.heroku.com/bot.js?key="..s) == "Whitelisted!" then
print("Whitelisted")
elseif game:HttpGet("https://WEBSITENAME.heroku.com/bot.js?key="..s) == "Not Whitelisted"
game.Players.LocalPlayer:Kick("Not Whitelisted")
else
game.Players.LocalPlayer:Kick("Not Whitelisted")
end -- SCRIPT IS NOT Secure
s = nil
b = nil
return;
