// ==UserScript==
// @name        Have a good day FB
// @namespace   haveagooddayfb
// @description Remove Facebook ads and suggested groups. Supported languages: l33t, english, italian, spanish, french, deutsch, portuguese. It requires jQuery [automatically done by the addon].
// @author      d4rk3rnigh7
// @include     *://*.facebook.com/*
// @require     https://config.privoxy.org/user-manual/jquery-3.2.1.min.js
// @version     2.9.9
// @grant       none
// ==/UserScript==

$(document).ready(function(){

	// Hide sponsored posts
	var byebye =
	[
		'=====5p4m===',
		'Sponsored',
		'Sponsorizzato',
		'Publicidad',
		'Sponsorisé',
		'Gesponsert',
		'Patrocinado',
		'Suggested Groups',
		'Gruppi suggeriti',
		'Grupos sugeridos',
		'Suggestions de groupes',
		'Vorgeschlagene Gruppen',
		'Grupos sugeridos'
	]

	// Check for desktop or mobile device
	var url = window.location.href.split('/')[2];

	$(document).on('scroll', function()
	{
		for( var i = 0; i < $('div[data-pagelet^=FeedUnit_]').length; i++ )
		{

			var checkUndefined = $('div[data-pagelet^=FeedUnit_]')[i].textContent.split('·')[1];
			if( typeof checkUndefined !== 'undefined')
			{

				var checkSponsorGroup = $('div[data-pagelet^=FeedUnit_]')[i].textContent.split('·')[1].replace(/\-/g, '').trim();
				for( var j = 0; j < byebye.length; j++ )
				{
					// Desktop
					if( url == 'www.facebook.com' )
					{
						if( checkSponsorGroup == byebye[j] )
						{
							$( $('div[data-pagelet^=FeedUnit_]') )[i].remove();
						}

					}
					else
					{	// Mobile
						if( $('article[class^=_55wo]:contains("' + byebye[j] + '")').length > 0 )
						{
							$('article[class^=_55wo]:contains("' + byebye[j] + '")').remove();
						}
					}

				}

			}

		}

	});
});