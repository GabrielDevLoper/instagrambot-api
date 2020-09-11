const puppeteer = require("puppeteer");

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function InstagramBotRun(email, password, linkSorteio, comment) {
  const browser = await puppeteer.launch({
    headless: false,
  });

  //Variaveis utilizadas
  let count = 0;
  let countTotal = 0;
  let times = `${getRandomInt(20, 50)}000`;

  //Login instagram
  const page = await browser.newPage();

  await page.goto("https://instagram.com");
  await (await page.waitFor('button[type="button"]')).click();
  await page.waitForNavigation();
  await page.type('input[name="email"]', email, { delay: 100 });
  await page.type('input[name="pass"]', password, { delay: 100 });
  await page.keyboard.press("Enter");

  await page.waitFor(10000);
  await page.goto(linkSorteio);

  Array.prototype.sample = function () {
    return this[Math.floor(Math.random() * this.length)];
  };

  Array.prototype.randomDiffElement = function (last) {
    if (this.length == 0) {
      return;
    } else if (this.length == 1) {
      return this[0];
    } else {
      var num = 0;
      do {
        num = Math.floor(Math.random() * this.length);
      } while (this[num] == last);
      return this[num];
    }
  };

  const array = comment;

  async function periodical() {
    var randoForWrite = `${getRandomInt(1, 5)}00`;
    var randoWaitFor = `${getRandomInt(1, 3)}000`;

    var rando = array.sample();
    var myRandoArrayDiffElement = array.randomDiffElement(rando);

    await page.type("form > textarea", `${myRandoArrayDiffElement}`, {
      delay: Number(randoForWrite),
    });
    await page.waitFor(Number(randoWaitFor));
    await (await page.waitFor("form > button")).click();

    count += 1;
    console.log(`${count} comentário enviado`);

    if (count === 50) {
      countTotal += count;
      //Condição verifica se ja fez 120 comentarios se sim coloca um tempo de espera maior para voltar a comentar
      if (countTotal === 150) {
        console.log(
          "Você ja fez 150 comentarios, espere 01:00 hora para voltar a comentar"
        );
        console.log(new Date());
        await page.waitFor(3600000);
        console.log(new Date());
        countTotal = 0;
        count = 0;
      } else {
        console.log("esperando 20 min para voltar a comentar");
        console.log(new Date());
        await page.waitFor(1200000);
        console.log(new Date());
        count = 0;
      }
    }
    times = `${getRandomInt(15, 50)}000`;
    setTimeout(periodical, Number(times));
  }
  setTimeout(periodical(), Number(times));
}

export { InstagramBotRun };
