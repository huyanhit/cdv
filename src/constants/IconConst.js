const CONST = { 
    REACTION: [1, 2, 3, 4, 5],
    EMOIJ:[
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
        41, 42, 43, 44, 45, 46, 47, 48, 49,
    ],
    ICON: {
        0:{
            name: 'Smiling face',
            src: '/src/assets/images/emo_smile.gif',
            code: ':)',
            altCode: ':)',
            showInList: true,
        },
        1:{
            name: 'Sad face',
            src: '/src/assets/images/emo_sad.gif',
            code: ':(',
            altCode: ':(',
            showInList: true,
        },
        2:{
            name: 'Laughing face',
            src: '/src/assets/images/emo_more_smile.gif',
            code: ':D',
            altCode: ':D',
            showInList: true,
        },
        3:{
            name: 'Smiling face with sunglasses',
            src: '/src/assets/images/emo_lucky.gif',
            code: '8-)',
            altCode: '8-)',
            showInList: true,
        },
        4:{
            name: 'Hushed face',
            src: '/src/assets/images/emo_surprise.gif',
            code: ':o',
            altCode: ':o',
            showInList: true,
        },
        5:{
            name: 'Winking face',
            src: '/src/assets/images/emo_wink.gif',
            code: ';)',
            altCode: ';)',
            showInList: true,
        },
        6:{
            name: 'Crying face',
            src: '/src/assets/images/emo_tears.gif',
            code: ';(',
            altCode: ';(',
            showInList: true,
        },
        7:{
            name: 'Face with cold sweat',
            src: '/src/assets/images/emo_sweat.gif',
            code: '(sweat)',
            altCode: '(sweat)',
            showInList: true,
        },
        8:{
            name: 'Silent face',
            src: '/src/assets/images/emo_mumu.gif',
            code: ':|',
            altCode: ':|',
            showInList: true,
        },
        9:{
            name: 'Kiss face',
            src: '/src/assets/images/emo_kiss.gif',
            code: ':*',
            altCode: ':*',
            showInList: true,
        },
        10:{
            name: 'Tongue face',
            src: '/src/assets/images/emo_tongueout.gif',
            code: ':p',
            altCode: ':p',
            showInList: true,
        },
        11:{
            name: 'Blushing face',
            src: '/src/assets/images/emo_blush.gif',
            code: '(blush)',
            altCode: '(blush)',
            showInList: true,
        },
        12:{
            name: 'Frowning face',
            src: '/src/assets/images/emo_wonder.gif',
            code: ':^)',
            altCode: ':^)',
            showInList: true,
        },
        13:{
            name: 'Sleeping face',
            src: '/src/assets/images/emo_snooze.gif',
            code: '|-)',
            altCode: '|-)',
            showInList: true,
        },
        14:{
            name: 'Smiling face with hearts',
            src: '/src/assets/images/emo_love.gif',
            code: '(inlove)',
            altCode: '(inlove)',
            showInList: true,
        },
        15:{
            name: 'Bragging face',
            src: '/src/assets/images/emo_grin.gif',
            code: ']:)',
            altCode: ']:)',
            showInList: true,
        },
        16:{
            name: 'Speaking face',
            src: '/src/assets/images/emo_talk.gif',
            code: '(talk)',
            altCode: '(talk)',
            showInList: true,
        },
        17:{
            name: 'Sleepy face',
            src: '/src/assets/images/emo_yawn.gif',
            code: '(yawn)',
            altCode: '(yawn)',
            showInList: true,
        },
        18:{
            name: 'Vomiting face',
            src: '/src/assets/images/emo_puke.gif',
            code: '(puke)',
            altCode: '(puke)',
            showInList: true,
        },
        19:{
            name: 'Hair flip face',
            src: '/src/assets/images/emo_ikemen.gif',
            code: '(emo)',
            altCode: '(emo)',
            showInList: true,
        },
        20:{
            name: 'Glasses face',
            src: '/src/assets/images/emo_otaku.gif',
            code: '8-|',
            altCode: '8-|',
            showInList: true,
        },
        21:{
            name: 'Grinning face',
            src: '/src/assets/images/emo_ninmari.gif',
            code: ':#)',
            altCode: ':#)',
            showInList: true,
        },
        22:{
            name: 'Nodding face',
            src: '/src/assets/images/emo_nod.gif',
            code: '(nod)',
            altCode: '(nod)',
            showInList: true,
        },
        23:{
            name: 'Shaking head face',
            src: '/src/assets/images/emo_shake.gif',
            code: '(shake)',
            altCode: '(shake)',
            showInList: true,
        },
        24:{
            name: 'Grinning face with sweat',
            src: '/src/assets/images/emo_wry_smile.gif',
            code: '(^^;)',
            altCode: '(^^;)',
            showInList: true,
        },
        25:{
            name: 'Sweating face',
            src: '/src/assets/images/emo_whew.gif',
            code: '(whew)',
            altCode: '(whew)',
            showInList: true,
        },
        26:{
            name: 'Clapping hands',
            src: '/src/assets/images/emo_clap.gif',
            code: '(clap)',
            altCode: '(clap)',
            showInList: true,
        },
        27:{
            name: 'Bowing Person',
            src: '/src/assets/images/emo_bow.gif',
            code: '(bow)',
            altCode: '(bow)',
            showInList: true,
        },
        28:{
            name: 'Saluting face',
            src: '/src/assets/images/emo_roger.gif',
            code: '(roger)',
            altCode: '(roger)',
            showInList: true,
        },
        29:{
            name: 'Flexing Person',
            src: '/src/assets/images/emo_muscle.gif',
            code: '(flex)',
            altCode: '(flex)',
            showInList: true,
        },
        30:{
            name: 'Dancer',
            src: '/src/assets/images/emo_dance.gif',
            code: '(dance)',
            altCode: '(dance)',
            showInList: true,
        },
        31:{
            name: 'Funny face',
            src: '/src/assets/images/emo_komanechi.gif',
            code: '(:/)',
            altCode: '(:/)',
            showInList: true,
        },
        32:{
            name: 'Raised fist',
            src: '/src/assets/images/emo_gogo.gif',
            code: '(gogo)',
            altCode: '(gogo)',
            showInList: true,
        },
        33:{
            name: 'Thinking face',
            src: '/src/assets/images/emo_think.gif',
            code: '(think)',
            altCode: '(think)',
            showInList: true,
        },
        34:{
            name: 'Please',
            src: '/src/assets/images/emo_please.gif',
            code: '(please)',
            altCode: '(please)',
            showInList: true,
        },
        35:{
            name: 'Hurrying face',
            src: '/src/assets/images/emo_quick.gif',
            code: '(quick)',
            altCode: '(quick)',
            showInList: true,
        },
        36:{
            name: 'Angry face',
            src: '/src/assets/images/emo_anger.gif',
            code: '(anger)',
            altCode: '(anger)',
            showInList: true,
        },
        37:{
            name: 'Smiling face with horns',
            src: '/src/assets/images/emo_devil.gif',
            code: '(devil)',
            altCode: '(devil)',
            showInList: true,
        },
        38:{
            name: 'Lightbulb',
            src: '/src/assets/images/emo_lightbulb.gif',
            code: '(lightbulb)',
            altCode: '(lightbulb)',
            showInList: true,
        },
        39:{
            name: 'Star',
            src: '/src/assets/images/emo_star.gif',
            code: '(*)',
            altCode: '(*)',
            showInList: true,
        },
        40:{
            name: 'Trembling heart',
            src: '/src/assets/images/emo_heart.gif',
            code: '(h)',
            altCode: '(h)',
            showInList: true,
        },
        41:{
            name: 'Blooming flower',
            src: '/src/assets/images/emo_flower.gif',
            code: '(F)',
            altCode: '(F)',
            showInList: true,
        },
        42:{
            name: 'Firecracker',
            src: '/src/assets/images/emo_cracker.gif',
            code: '(cracker)',
            altCode: '(cracker)',
            showInList: true,
        },
        43:{
            name: 'Food',
            src: '/src/assets/images/emo_eat.gif',
            code: '(eat)',
            altCode: '(eat)',
            showInList: true,
        },
        44:{
            name: 'Cake',
            src: '/src/assets/images/emo_cake.gif',
            code: '(^)',
            altCode: '(^)',
            showInList: true,
        },
        45:{
            name: 'Coffee',
            src: '/src/assets/images/emo_coffee.gif',
            code: '(coffee)',
            altCode: '(coffee)',
            showInList: true,
        },
        46:{
            name: 'Beer',
            src: '/src/assets/images/emo_beer.gif',
            code: '(beer)',
            altCode: '(beer)',
            showInList: true,
        },
        47:{
            name: 'Handshake',
            src: '/src/assets/images/emo_handshake.gif',
            code: '(handshake)',
            altCode: '(handshake)',
            showInList: true,
        },
        48:{
            name: 'Thumbs up',
            src: '/src/assets/images/emo_yes.gif',
            code: '(y)',
            altCode: '(y)',
            showInList: true,
        },
        49:{
            name: 'Thumbs up',
            src: '/src/assets/images/rolling-on-the-floor-laughing.gif',
            code: '=))',
            altCode: '=))',
            showInList: false,
        },
    }
}

export default CONST;