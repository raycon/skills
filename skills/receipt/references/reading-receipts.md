# Reading a receipt image

Read the image once and write down what it says, not what it probably says. Wrong numbers in a purchase log are worse than gaps.

## Fields

```
Kind: receipt
Date: 2026-11-16
Time: 22:09
Merchant: Corner Market Central
Amount: 8980
Card: 12345678 KB single payment
Approval: 30012345
Check: none
## Items
| Item | Unit price | Qty | Amount |
| --- | ---: | ---: | ---: |
| Green onions | 2,980 | 1 | 2,980 |
| Potato chips 150g | 3,500 | 2 | 7,000 |
## Discounts
- Coupon -1,000
```

- **Date and time**: when the payment was approved. If there's no approval time, use the transaction time printed on the receipt
- **Merchant**: the business name and branch exactly as printed
- **Amount**: what was actually paid (결제대상금액, 받은금액), not the total before discounts. Digits only, no commas
- **Card**: the visible leading digits, the card company as printed, and installments. For cash or other methods, write that method. Never fill in masked digits
- **Approval number**: sometimes printed without a label. An 8-digit number in square brackets in the card slip part is the approval number (`[30012345] KICC로제출`). If there is none, leave it empty
- **Items**: names exactly as printed, even when truncated (`ICE 아메리`). An option line (`ㄴ▶샷 추가`) becomes its own row with `ㄴ ` in front of the name
- **Discounts**: discounts, coupons, gift certificates and points used. Omit the section if there are none
- **Leave out**: exchange and refund notices, barcodes, business registration numbers, addresses, phone numbers, owner names, membership numbers, points earned

## Check

Add up the item amounts, subtract the discounts, and compare with the amount paid. If it matches and every field was readable, write `Check: none`. Otherwise describe the problem in one line, for example `items 9,980, discounts 1,000, paid 8,980; the second item's amount is blurry`.

Write unreadable characters as `?` and mention them in the check. Don't guess.

## Medical bills

Use the clinic name as the merchant, add `Patient: <name>` after the card line, and replace `## Items` with only the lines the bill shows:

```
## Medical bill
- Visit date: 2026-11-16
- Department: Pediatrics
- Patient's share: 5,600
- Non-covered: 0
- Paid: 5,600
```

## Other images

For anything that isn't a receipt or a medical bill, write only the kind (a drawing, a document, a photo) and one line on what it shows.
