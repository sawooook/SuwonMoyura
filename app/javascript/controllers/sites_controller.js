import {Controller} from "stimulus"

export default class extends Controller{
    static get targets() {
        return [ "map" ]
    }

    connect() {
        var Cheight = $(window).height();
        $('#map-size').css({'height':Cheight+'px'});

        var options = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
            level: 3 //지도의 레벨(확대, 축소 정도)
        };

        var map = new kakao.maps.Map(this.mapTarget, options); //지도 생성 및 객체 리턴
        map.
        this.load_site(map)
    }

    load_site(map){
        var markerPosition  = new kakao.maps.LatLng(33.450701, 126.570667);
        var marker = new kakao.maps.Marker({
            position: markerPosition
        });
        marker.setMap(map);
        // 맵을 어떻게 뿌릴것인가 ? redis에 넣을것인가?
    }
}