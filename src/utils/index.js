import { initializeHttp } from "./api-communicator";
import config from '../config';
export * from "./token";
export * from "./api-communicator";
export { default as responseFormatter } from "./response-formatter";

initializeHttp(config);