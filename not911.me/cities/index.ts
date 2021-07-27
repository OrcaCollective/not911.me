import glob from 'glob';
import path from 'path';
import fs from 'fs';
import { parse } from 'yaml';

import type { City } from '../types';

const cityFiles = glob.sync(path.join(process.cwd(), 'cities/*.yaml'));
export const cities: City[] = cityFiles.map(file => parse(String(fs.readFileSync(file))));
