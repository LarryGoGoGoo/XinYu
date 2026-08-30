#coding:utf-8
__author__ = "ila"
import os
import requests
def geocoding(ak,lat, lon):
    lat_lon = '{},{}'.format(lat, lon)
    # address=str(i[0])+','+str(i[1])
    url = 'http://api.map.baidu.com/geocoder?output=json&key={}&location={}'.format(ak, str(lat_lon))
    r = requests.get(url)
    contents = r.json()
    print(contents)
    address = contents.get("result").get("addressComponent")
    # print(address)
    return address

if __name__=='__main__':
    api_key = os.environ.get("BAIDU_MAP_AK")
    if not api_key:
        raise RuntimeError("BAIDU_MAP_AK is required")
    address=geocoding(api_key,24.2943350100,116.1287866600)
    print(address)
