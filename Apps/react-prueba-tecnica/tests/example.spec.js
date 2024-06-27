// @ts-check
// @ts-ignore
import { test, expect } from '@playwright/test'

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'
const LOCALHOST_URL = 'http://localhost:5173/'

test('app shows random fact and image', async ({ page }) => {
  await page.goto('http://localhost:5173')
  const textContent = await page.getByRole('paragraph').textContent()
  const imageSrc = await page.getByRole('img').nth(0).getAttribute('src')  // Selecciona el primer img

  await expect(textContent?.length).toBeGreaterThan(0)
  const url = new URL(imageSrc)
  await expect(url.origin).toBe('http://localhost:5173')
})
