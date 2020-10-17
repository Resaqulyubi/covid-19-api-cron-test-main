import {daily} from './daily'
import {og} from './og'
import * as fs from "fs";
import { promisify } from "util";
import format  from 'date-fns/format';
(async ()=>{
    const [
        statusOg,
        statusDaily
      ] = await Promise.all([
        og(),
        daily()
      ]);
      const write = promisify(fs.writeFile);
      const writeReadme=`# store covid daily api as json data

- last cronjob : ${format(new Date(), "cccc, dd LLLL yyyy HH:mm:ss")}
- status og cron : ${statusOg?"success":"error"}
- status daily cron : ${statusDaily?"success":"error"}
      
      `;
      await write("README.md", writeReadme);
    
})()
