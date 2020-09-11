import Puppeteer from "puppeteer";
import getRandomInt from "./getRandom";

class InstagramBotUseFacebook {
  async RunScript(
    email?: string | undefined,
    password?: string | undefined,
    linkSorteio?: string | undefined,
    comment?: string[] | undefined,
    stop?: boolean | undefined
  ) {
    const browser = await Puppeteer.launch({
      headless: false,
    });

    //variaveis
    let count: number = 0;
    let countInterval: number = 0;
    let countTotal: number = 0;
    let times: string = "";

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

    const array = comment;

    if (stop) {
      await browser.close();
    }

    async function periodical() {
      var randoForWrite = `${getRandomInt(1, 5)}00`;
      var randoWaitFor = `${getRandomInt(1, 3)}000`;

      let randomElement = array[Math.floor(Math.random() * array.length)];

      await page.type("form > textarea", `${randomElement}`, {
        delay: Number(randoForWrite),
      });
      await page.waitFor(Number(randoWaitFor));
      await (await page.waitFor("form > button")).click();

      count += 1;
      console.log(`${count} comentário enviado`);

      if (count === 50) {
        countTotal += this.count;
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
      this.times = `${getRandomInt(15, 50)}000`;
      setTimeout(periodical, Number(times));
    }
    setTimeout(periodical, Number(times));
  }
}

// utilizando sigleton js, exporta a classe ja instanciada.
export default new InstagramBotUseFacebook();
