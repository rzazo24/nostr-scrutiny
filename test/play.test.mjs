import { test } from 'node:test'
import assert from 'node:assert/strict'
import { aboutDeveloper } from '../src/sources/play.mjs'

test('reads the "About the developer" block of a Google Play listing', () => {
  const html = '<div class="Bne0R ">About the developer</div><div class="HhKIQc"><div> ACME LLC </div><div> info@acme.example </div><div class="mHsyY"> 1 Main St\\nSpringfield, IL 62701\\nUnited States </div><div> +1 555-010-0000 </div></div></div>'
  assert.deepEqual(aboutDeveloper(html), { legalName: 'ACME LLC', email: 'info@acme.example', address: '1 Main St\nSpringfield, IL 62701\nUnited States', phone: '+1 555-010-0000' })
  assert.deepEqual(aboutDeveloper('<html></html>'), { legalName: null, email: null, address: null, phone: null })
})
