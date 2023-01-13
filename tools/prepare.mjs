#!/usr/bin/env node

import { readFile, writeFile } from 'node:fs/promises'
import process from 'node:process'

import husky from 'husky'

const isProductionEnvironment = process.env.NODE_ENV === 'production'

if (!isProductionEnvironment) {
  husky.install()

  const filePath = '.husky/_/husky.sh'

  const file = await readFile(filePath, 'utf8')
  const updatedFile = file.replace(/sh/g, 'bash')

  await writeFile(filePath, updatedFile)
}
