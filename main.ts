function initScores () {
    statusA = 0
    statusB = 0
    statusC = 0
    statusD = 0
    spelScore = 0
    touchbit.setLight(touchbit.TouchPad.a, 0)
    touchbit.setLight(touchbit.TouchPad.b, 0)
    touchbit.setLight(touchbit.TouchPad.c, 0)
    touchbit.setLight(touchbit.TouchPad.d, 0)
}
touchbit.on(touchbit.TouchPad.c, touchbit.TouchEvent.released, function () {
    if (statusC == 0) {
        statusC = 1
        touchbit.setLight(touchbit.TouchPad.c, 1)
    } else {
        statusC = 0
        touchbit.setLight(touchbit.TouchPad.c, 0)
    }
    toonWinnaars()
})
touchbit.on(touchbit.TouchPad.right, touchbit.TouchEvent.released, function () {
    spelScore += 1
    basic.showNumber(spelScore)
})
input.onButtonPressed(Button.A, function () {
    spelScore = spelScore * 2
    basic.showNumber(spelScore)
})
function toonWinnaars () {
    basic.clearScreen()
    for (let ledIndexX = 0; ledIndexX <= 4; ledIndexX++) {
        led.plotBrightness(ledIndexX, 2, 16)
    }
    for (let ledIndexY = 0; ledIndexY <= 4; ledIndexY++) {
        led.plotBrightness(2, ledIndexY, 16)
    }
    if (statusA == 1) {
        led.plotBrightness(0, 0, 255)
        led.plotBrightness(0, 1, 255)
        led.plotBrightness(1, 0, 255)
        led.plotBrightness(1, 1, 255)
    }
    if (statusB == 1) {
        led.plotBrightness(3, 0, 255)
        led.plotBrightness(3, 1, 255)
        led.plotBrightness(4, 0, 255)
        led.plotBrightness(4, 1, 255)
    }
    if (statusC == 1) {
        led.plotBrightness(3, 3, 255)
        led.plotBrightness(3, 4, 255)
        led.plotBrightness(4, 3, 255)
        led.plotBrightness(4, 4, 255)
    }
    if (statusD == 1) {
        led.plotBrightness(0, 3, 255)
        led.plotBrightness(0, 4, 255)
        led.plotBrightness(1, 3, 255)
        led.plotBrightness(1, 4, 255)
    }
}
input.onButtonPressed(Button.AB, function () {
    initScores()
    basic.showIcon(IconNames.Square)
})
touchbit.on(touchbit.TouchPad.left, touchbit.TouchEvent.released, function () {
    spelScore += -1
    basic.showNumber(spelScore)
})
input.onButtonPressed(Button.B, function () {
    aantalSpelers = statusA + (statusB + (statusC + statusD))
    if (aantalSpelers == 1) {
        if (statusA == 1) {
            totScore1 = totScore1 + spelScore * 3
            totScore2 = totScore2 - spelScore
            totScore3 = totScore3 - spelScore
            totScore4 = totScore4 - spelScore
        } else if (statusB == 1) {
            totScore1 = totScore1 - spelScore
            totScore2 = totScore2 + spelScore * 3
            totScore3 = totScore3 - spelScore
            totScore4 = totScore4 - spelScore
        } else if (statusC == 1) {
            totScore1 = totScore1 - spelScore
            totScore2 = totScore2 - spelScore
            totScore3 = totScore3 + spelScore * 3
            totScore4 = totScore4 - spelScore
        } else if (statusD == 1) {
            totScore1 = totScore1 - spelScore
            totScore2 = totScore2 - spelScore
            totScore3 = totScore3 - spelScore
            totScore4 = totScore4 + spelScore * 3
        }
    } else if (aantalSpelers == 2) {
        if (statusA == 1) {
            totScore1 = totScore1 + spelScore
        } else {
            totScore1 = totScore1 - spelScore
        }
        if (statusB == 1) {
            totScore2 = totScore2 + spelScore
        } else {
            totScore2 = totScore2 - spelScore
        }
        if (statusC == 1) {
            totScore3 = totScore3 + spelScore
        } else {
            totScore3 = totScore3 - spelScore
        }
        if (statusD == 1) {
            totScore4 = totScore4 + spelScore
        } else {
            totScore4 = totScore4 - spelScore
        }
    } else {
        basic.showString("FOUT")
    }
    Kitronik_VIEWTEXT32.showParameter(Kitronik_VIEWTEXT32.ShowAlign.Left, Kitronik_VIEWTEXT32.ShowPage.Double, 1500)
    Kitronik_VIEWTEXT32.showString("" + speler1.charAt(0) + "=" + totScore1 + ("/" + speler2.charAt(0) + "=") + totScore2 + (" " + speler4.charAt(0) + "=") + totScore4 + ("/" + speler3.charAt(0) + "=") + totScore3)
    gever += 1
    if (gever > 4) {
        gever = 1
    }
    radio.setGroup(1)
    radio.sendValue("totScore", totScore1)
    basic.pause(200)
    radio.setGroup(2)
    radio.sendValue("totScore", totScore2)
    basic.pause(200)
    radio.setGroup(3)
    radio.sendValue("totScore", totScore3)
    basic.pause(200)
    radio.setGroup(4)
    radio.sendValue("totScore", totScore4)
    basic.pause(200)
    radio.setGroup(gever)
    radio.sendValue("gever", 1)
    basic.pause(200)
    radio.setGroup(255)
    basic.pause(500)
    radio.sendString("" + speler1 + ": " + totScore1)
    basic.pause(200)
    radio.sendString("" + speler2 + ": " + totScore2)
    basic.pause(200)
    radio.sendString("" + speler3 + ": " + totScore3)
    basic.pause(200)
    radio.sendString("" + speler4 + ": " + totScore4)
    basic.pause(200)
    radio.sendString("---------------------------------")
    basic.pause(200)
    if (gever == 1) {
        radio.sendString("" + speler1 + " deelt")
    } else if (gever == 2) {
        radio.sendString("" + speler2 + " deelt")
    } else if (gever == 3) {
        radio.sendString("" + speler3 + " deelt")
    } else if (gever == 4) {
        radio.sendString("" + speler4 + " deelt")
    }
})
touchbit.on(touchbit.TouchPad.d, touchbit.TouchEvent.released, function () {
    if (statusD == 0) {
        statusD = 1
        touchbit.setLight(touchbit.TouchPad.d, 1)
    } else {
        statusD = 0
        touchbit.setLight(touchbit.TouchPad.d, 0)
    }
    toonWinnaars()
})
touchbit.on(touchbit.TouchPad.b, touchbit.TouchEvent.released, function () {
    if (statusB == 0) {
        statusB = 1
        touchbit.setLight(touchbit.TouchPad.b, 1)
    } else {
        statusB = 0
        touchbit.setLight(touchbit.TouchPad.b, 0)
    }
    toonWinnaars()
})
touchbit.on(touchbit.TouchPad.a, touchbit.TouchEvent.released, function () {
    if (statusA == 0) {
        statusA = 1
        touchbit.setLight(touchbit.TouchPad.a, 1)
    } else {
        statusA = 0
        touchbit.setLight(touchbit.TouchPad.a, 0)
    }
    toonWinnaars()
})
let aantalSpelers = 0
let spelScore = 0
let statusD = 0
let statusC = 0
let statusB = 0
let statusA = 0
let gever = 0
let totScore4 = 0
let totScore3 = 0
let totScore2 = 0
let totScore1 = 0
let speler4 = ""
let speler3 = ""
let speler2 = ""
let speler1 = ""
speler1 = "Freddy"
speler2 = "Anne"
speler3 = "Chris"
speler4 = "Lucy"
radio.setGroup(255)
radio.sendString("KLEURENWIEZEN LOG")
radio.sendString("")
Kitronik_VIEWTEXT32.clearDisplay()
touchbit.lightModeManual()
totScore1 = 0
totScore2 = 0
totScore3 = 0
totScore4 = 0
initScores()
radio.setGroup(1)
radio.sendString(speler1)
radio.setGroup(2)
radio.sendString(speler2)
radio.setGroup(3)
radio.sendString(speler3)
radio.setGroup(4)
radio.sendString(speler4)
for (let index = 0; index <= 3; index++) {
    radio.setGroup(index + 1)
    radio.sendValue("totScore", 0)
    basic.pause(200)
}
gever = randint(1, 4)
radio.setGroup(255)
basic.pause(200)
if (gever == 1) {
    Kitronik_VIEWTEXT32.showString("" + speler1 + " deelt")
    radio.sendString("" + speler1 + " deelt")
} else if (gever == 2) {
    Kitronik_VIEWTEXT32.showString("" + speler2 + " deelt")
    radio.sendString("" + speler2 + " deelt")
} else if (gever == 3) {
    Kitronik_VIEWTEXT32.showString("" + speler3 + " deelt")
    radio.sendString("" + speler3 + " deelt")
} else if (gever == 4) {
    Kitronik_VIEWTEXT32.showString("" + speler4 + " deelt")
    radio.sendString("" + speler4 + " deelt")
}
radio.setGroup(gever)
basic.pause(200)
radio.sendValue("gever", 1)
