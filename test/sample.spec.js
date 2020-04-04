describe('add todo', function () {
    let page;

    before (async function () {
      page = await browser.newPage();
      await page.goto('http://127.0.0.1:7001/');
    });
  
    after (async function () {
      await page.close();
    });

    it('should have correct title', async function() {
        expect(await page.title()).to.eql('Koa • Todo');
    })
    it('should new todo correct', async function() {
      await page.click('#new-todo', {delay: 500});
      await page.type('#new-todo', 'new todo item', {delay: 50});
      await page.keyboard.press("Enter");
      let todoList = await page.waitFor('#todo-list');
      const expectInputContent = await page.evaluate(todoList => todoList.lastChild.querySelector('label').textContent, todoList);
      expect(expectInputContent).to.eql('new todo item');
    }) 
    it('should get the length',async function(){
      let todoList = await page.waitFor('#todo-list');
      const length=await page.evaluate(todoList => todoList.children.length, todoList);
      expect(length).to.eql(4);
    })
    it('should completed the todo item',async function(){
      //item left数量
      let left_count1=await page.evaluate(()=>{
        let count=document.querySelector("strong").innerText;
        return count;
      })
      console.log(left_count1)
      await page.click('#todo-list > li:nth-child(1) > div > input',{delay:500});
      let todoList = await page.waitFor('#todo-list');
      let left_count2 = await page.evaluate(todoList => document.querySelector("strong").innerText, todoList);
      console.log(left_count2)
      left_count1=parseInt(left_count1)-1;
      left_count2=parseInt(left_count2);
      expect(left_count1).to.eql(left_count2);
      
    })
    
  });
  