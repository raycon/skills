# Reading a receipt image

Read the image once and write down what it says, not what it probably says. Wrong numbers in a purchase log are worse than gaps.

## Fields

```
종류: 영수증
날짜: 2026-11-16
시각: 22:09
가맹점: 이마트 트레이더스 수원점
금액: 82480
카드: 37918324 삼성 일시불
승인번호: 71953674
확인: 없음
## 품목
| 품목 | 단가 | 수량 | 금액 |
| --- | ---: | ---: | ---: |
| 무 2입(봉) | 2,280 | 1 | 2,280 |
| 농심 수미칩 300g | 8,180 | 2 | 16,360 |
## 할인
- 고기구독권 -10,000
```

- **Date and time**: when the payment was approved. If there's no approval time, use the transaction time printed on the receipt
- **Merchant**: the business name and branch exactly as printed
- **Amount**: what was actually paid (결제대상금액, 받은금액), not the total before discounts. Digits only, no commas
- **Card**: the visible leading digits, the card company as printed, and installments. For cash or other methods, write that method. Never fill in masked digits
- **Approval number**: sometimes printed without a label. An 8-digit number in square brackets in the card slip part is the approval number (`[96687008] KICC로제출`). If there is none, leave it empty
- **Items**: names exactly as printed, even when truncated (`ICE 아메리`). An option line (`ㄴ▶샷 추가`) becomes its own row with `ㄴ ` in front of the name
- **Discounts**: discounts, coupons, gift certificates and points used. Omit the section if there are none
- **Leave out**: exchange and refund notices, barcodes, business registration numbers, addresses, phone numbers, owner names, membership numbers, points earned

## Check

Add up the item amounts, subtract the discounts, and compare with the amount paid. If it matches and every field was readable, write `확인: 없음`. Otherwise describe the problem in one line, for example `품목 합계 92,480, 할인 10,000, 결제 82,480 중 두 번째 품목 금액이 흐림`.

Write unreadable characters as `?` and mention them in the check. Don't guess.

## Medical bills

Use the clinic name as the merchant, add `환자: <name>` after the card line, and replace `## 품목` with only the lines the bill shows:

```
## 진료비
- 진료일: 2026-11-16
- 진료과: 소아청소년과
- 본인부담금: 5,600
- 비급여: 0
- 결제금액: 5,600
```

## Other images

For anything that isn't a receipt or a medical bill, write only the kind (a drawing, a document, a photo) and one line on what it shows.
