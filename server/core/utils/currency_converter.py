import re
import requests
import bs4
from decimal import Decimal

def currency_converter(base, to, amount):
    url = f"https://www.xe.com/currencyconverter/convert/?Amount={amount}&From={base}&To={to}"
    response = requests.get(url)
    soup = bs4.BeautifulSoup(response.text, "html.parser")
    result = soup.find("p", {"class": "result__BigRate-sc-1bsijpp-1 dPdXSB"}).get_text(strip=True)
    num_result = Decimal(re.findall(r"[0-9.]+", result)[0])
    return num_result