import glob from 'glob';
import path from 'path';
import fs from 'fs';
import { parse } from 'yaml';

import type { CategoryDescription } from '../types';

const categoryFiles = glob.sync(path.join(process.cwd(), 'categories/*.yaml'));
export const categories: CategoryDescription[] = categoryFiles.map(file => parse(String(fs.readFileSync(file))));
