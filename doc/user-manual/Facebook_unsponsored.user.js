// ==UserScript==
// @name         Facebook unsponsored
// @namespace    http://tampermonkey.net/
// @version      1.8
// @description  Block Facebook news feed "sponsored" posts
// @author       solskido
// @supportURL   https://greasyfork.org/en/scripts/22210-facebook-unsponsored/feedback
// @match        https://www.facebook.com/*
// @run-at       document-idle
// @grant        none
//
// Thanks to: enm, Mathieu
//
// ==/UserScript==

(function() {
    'use strict';
    // Selectors
    var streamSelector = 'div[id^="topnews_main_stream"]';
    var storySelector = 'div[id^="hyperfeed_story_id"]';
    var searchedNodes = [{
        'selector': '.fbUserContent div > span > a:not([title]):not([role]):not(.UFICommentActorName):not(.uiLinkSubtle):not(.profileLink)',
        'content': {
            'af':      ['Geborg'],
            'ar':      ['إعلان مُموَّل'],
            'as':      ['পৃষ্ঠপোষকতা কৰা'],
            'ay':      ['Yatiyanaka'],
            'az':      ['Sponsor dəstəkli'],
            'be':      ['Рэклама'],
            'br':      ['Paeroniet'],
            'bs':      ['Sponzorirano'],
            'bn':      ['সৌজন্যে'],
            'ca':      ['Patrocinat'],
            'co':      ['Spunsurizatu'],
            'cs':      ['Sponzorováno'],
            'cx':      ['Giisponsoran'],
            'cy':      ['Noddwyd'],
            'de':      ['Gesponsert'],
            'el':      ['Χορηγούμενη'],
            'en':      ['Sponsored'],
            'es':      ['Publicidad', 'Patrocinado'],
            'fr':      ['Commandité', 'Sponsorisé'],
            'gx':      ['Χορηγούμενον'],
            'hi':      ['प्रायोजित'],
            'id':      ['Bersponsor'],
            'it':      ['Sponsorizzata'],
            'ja':      ['広告'],
            'jv':      ['Disponsori'],
            'kk':      ['Демеушілік көрсеткен'],
            'km':      ['បានឧបត្ថម្ភ'],
            'lo':      ['ໄດ້ຮັບການສະໜັບສະໜູນ'],
            'ml':      ['സ്പോൺസർ ചെയ്തത്'],
            'mr':      ['प्रायोजित'],
            'ms':      ['Ditaja'],
            'ne':      ['प्रायोजित'],
            'or':      ['ପ୍ରଯୋଜିତ'],
            'pa':      ['ਸਰਪ੍ਰਸਤੀ ਪ੍ਰਾਪਤ'],
            'pl':      ['Sponsorowane'],
            'pt':      ['Patrocinado'],
            'ru':      ['Реклама'],
            'sa':      ['प्रायोजितः |'],
            'si':      ['අනුග්‍රහය දක්වන ලද'],
            'so':      ['La maalgeliyey'],
            'sv':      ['Sponsrad'],
            'te':      ['స్పాన్సర్ చేసినవి'],
            'tr':      ['Sponsorlu'],
            'zh-Hans': ['赞助内容'],
            'zh-Hant': ['贊助']
        }
    }, {
        'selector': '.fbUserContent > div > div > span',
        'content': {
            'af':        ['Voorgestelde Plasing'],
            'ar':        ['منشور مقترح'],
            'as':        ['পৰামৰ্শিত প\'ষ্ট'],
            'az':        ['Təklif edilən yazılar'],
            'be':        ['Прапанаваны допіс'],
            'bn':        ['প্রস্তাবিত পোস্ট'],
            'br':        ['Embannadenn aliet'],
            'bs':        ['Predloženi sadržaj'],
            'ca':        ['Publicació suggerida'],
            'co':        ['Posti cunsigliati'],
            'cs':        ['Navrhovaný příspěvek'],
            'cx':        ['Gisugyot nga Pagpatik'],
            'cy':        ['Neges a Awgrymir'],
            'de':        ['Vorgeschlagener Beitrag'],
            'el':        ['Προτεινόμενη δημοσίευση'],
            'en':        ['Suggested Post'],
            'es':        ['Publicación sugerida'],
            'fr':        ['Publication suggérée'],
            'gx':        ['Παϱαινουμένη Ἔκϑεσις'],
            'hi':        ['सुझाई गई पोस्ट'],
            'it':        ['Post consigliato'],
            'id':        ['Saran Kiriman'],
            'ja':        ['おすすめの投稿'],
            'jv':        ['Kiriman sing Disaranake'],
            'kk':        ['Ұсынылған жазба'],
            'km':        ['ការប្រកាសដែលបានណែនាំ'],
            'ko':        ['추천 게시물'],
            'lo':        ['ໂພສຕ໌ແນະນຳ'],
            'ml':        ['നിർദ്ദേശിച്ച പോ‌സ്റ്റ്'],
            'mr':        ['सुचवलेली पोस्ट'],
            'ms':        ['Kiriman Dicadangkan'],
            'ne':        ['सुझाव गरिएको पोस्ट'],
            'or':        ['ପ୍ରସ୍ତାବିତ ପୋଷ୍ଟ'],
            'pa':        ['ਸੁਝਾਈ ਗਈ ਪੋਸਟ'],
            'pl':        ['Proponowany post'],
            'pt':        ['Publicação sugerida'],
            'ru':        ['Рекомендуемая публикация'],
            'sa':        ['उपॆक्षित प्रकटनं'],
            'si':        ['යෝජිත පළ කිරීම'],
            'so':        ['Bandhig la soo jeediye'],
            'sv':        ['Föreslaget inlägg'],
            'te':        ['సూచింపబడిన పోస్ట్'],
            'tr':        ['Önerilen Gönderiler', 'Önerilen Gönderi'],
            'zh-Hans':   ['推荐帖子'],
            'zh-Hant':   ['推薦帖子', '推薦貼文']
        }
    }, {
        'selector': '.fbUserContent > div > div > div:not(.userContent)',
        'exclude': function(node) {
            if(!node) {
                return true;
            }

            return (node.children && node.children.length);
        },
        'content': {
            'af':        ['Popular Live Video'],
            'ar':        ['مباشر رائج'],
            'as':        ['Popular Live Video'],
            'az':        ['Popular Live Video'],
            'bn':        ['জনপ্রিয় লাইভ ভিডিও'],
            'br':        ['Video Siaran Langsung Populer'],
            'bs':        ['Video Siaran Langsung Populer'],
            'ca':        ['Video Siaran Langsung Populer'],
            'cs':        ['Populární živé vysílání'],
            'de':        ['Beliebtes Live-Video'],
            'en':        ['Popular Live Video'],
            'es':        ['Vídeo en directo popular'],
            'fr':        ['Vidéo en direct populaire'],
            'hi':        ['लोकप्रिय लाइव वीडियो'],
            'it':        ['Video in diretta popolare'],
            'id':        ['Video Siaran Langsung Populer'],
            'ja':        ['人気ライブ動画'],
            'jv':        ['Video Siaran Langsung Populer'],
            'kk':        ['Popular Live Video'],
            'km':        ['Popular Live Video'],
            'ko':        ['인기 라이브 방송'],
            'lo':        ['Popular Live Video'],
            'ml':        ['ജനപ്രിയ Live വീഡിയോ'],
            'mr':        ['प्रसिद्ध थेट व्हिडिओ'],
            'ms':        ['Video Live Popular'],
            'ne':        ['Popular Live Video'],
            'or':        ['Popular Live Video'],
            'pa':        ['ਪ੍ਰਸਿੱਧ ਲਾਈਵ ਵੀਡੀਓਜ਼'],
            'pl':        ['Popularna transmisja wideo na żywo'],
            'pt':        ['Vídeo em direto popular', 'Vídeo ao vivo popular'],
            'ru':        ['Популярный прямой эфир'],
            'sa':        ['Popular Live Video'],
            'si':        ['Popular Live Video'],
            'so':        ['Popular Live Video'],
            'te':        ['ప్రసిద్ధ ప్రత్యక్ష ప్రసార వీడియో'],
            'tr':        ['Popular Live Video'],
            'zh-Hans':   ['热门直播视频'],
            'zh-Hant':   ['熱門直播視訊', '熱門直播視像']
        }
    }];

    var language = document.documentElement.lang;
    var nodeContentKey = (('innerText' in document.documentElement) ? 'innerText' : 'textContent');
    var mutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

    // Default to 'en' when the current language isn't yet supported
    var i;
    for(i = 0; i < searchedNodes.length; i++) {
        if(searchedNodes[i].content[language]) {
            searchedNodes[i].content = searchedNodes[i].content[language];
        }
        else {
            searchedNodes[i].content = searchedNodes[i].content.en;
        }
    }

    var body;
    var stream;
    var observer;

    function block(story) {
        if(!story) {
            return;
        }

        story.remove();
    }

    function isSponsored(story) {
        if(!story) {
            return false;
        }

        var nodes;
        var nodeContent;

        var h;
        var i;
        var j;
        for(h = 0; h < searchedNodes.length; h++) {
            nodes = story.querySelectorAll(searchedNodes[h].selector);
            for(i = 0; i < nodes.length; i++) {
                nodeContent = nodes[i][nodeContentKey];
                if(nodeContent) {
                    for(j = 0; j < searchedNodes[h].content.length; j++) {
                        if(searchedNodes[h].exclude && searchedNodes[h].exclude(nodes[i])) {
                           continue;
                        }

                        if(nodeContent.trim() == searchedNodes[h].content[j]) {
                            return true;
                        }
                    }
                }
            }
        }

        return false;
    }

    function process() {
        // Locate the stream every iteration to allow for FB SPA navigation which
        // replaces the stream element
        stream = document.querySelector(streamSelector);
        if(!stream) {
            return;
        }

        var stories = stream.querySelectorAll(storySelector);
        if(!stories.length) {
            return;
        }

        var i;
        for(i = 0; i < stories.length; i++) {
            if(isSponsored(stories[i])) {
                block(stories[i]);
            }
        }
    }

    if(mutationObserver) {
        body = document.querySelector('body');
        if(!body) {
            return;
        }

        observer = new mutationObserver(process);
        observer.observe(body, {
            'childList': true,
            'subtree': true
        });
    }
})();
