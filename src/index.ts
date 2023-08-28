/* istanbul ignore file */
import {config} from "dotenv"
import {Bot} from './Bot';
import {getLogger} from './logger';

const winston = getLogger('index.ts');

winston.info("Loading config from .env file");
config();

winston.info("Starting bot");
Bot.start();