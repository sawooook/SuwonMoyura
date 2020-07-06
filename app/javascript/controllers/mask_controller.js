import {Controller} from "stimulus"
import Rails from "@rails/ujs"

export default class extends Controller {
    static get targets() {
        return ["map", "title", "address", "stockAt", "remainStat", "createdAt"]
    }

    connect() {
        var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png', // 마커이미지의 주소입니다
            imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
            imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        var controller =this
        var markers = []
        $('#progressBar').fadeOut()

        var Cheight = $(window).height();

        $('#map-size').css({'height':Cheight+'px'});
        var options = {
            center: new kakao.maps.LatLng(37.2788, 126.953),
            level: 2,
            maxLevel: 3
        };

        //- 맵성 객체 생성
        var map = new kakao.maps.Map(this.mapTarget, options)


        // 마우스 드래그로 지도 이동이 완료되었을 때 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
        kakao.maps.event.addListener(map, 'dragend', function() {

            // 지도 중심좌표를 얻어옵니다

            var latlng = map.getCenter();
            var mapX = latlng.getLat()
            var mapY = latlng.getLng()
            var url = `pharmacys/load_pharmacy?lat=${mapX}&lng=${mapY}`

            Rails.ajax({
                type : "GET",
                url : url,
                success: function (response) {

                    for (var index = 0; index < markers.length; index++){
                        markers[index].setMap(null)
                    }

                    response.forEach(function (pharmacy) {


                        let markerPosition  = new kakao.maps.LatLng(pharmacy["lat"], pharmacy["lng"]);
                        let markerTitle = pharmacy["name"]
                        let marketAddress = pharmacy["addr"]
                        let markerStockAt = pharmacy["stock_at"]
                        let remainStat = pharmacy["remain_stat"]
                        let createdAt = pharmacy["created_at"]

                        switch (remainStat){
                            case "empty" :
                               remainStat =  "재고없음 (1개 이하)";
                                break;
                            case "break" :
                                remainStat = "판매중지";
                                break;
                            case "plenty" :
                                remainStat = "재고많음 (100개 이상)";
                                break;
                            case "some" :
                                remainStat = "재고보통 (30개 ~ 100개)";
                                break;
                            case "few" :
                                remainStat = "재고부족 (2개 ~ 30개)";
                                break;
                        }
                        console.log("=============")
                        console.log(remainStat)


                        let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)

                        var marker = new kakao.maps.Marker({
                            position: markerPosition,
                            image: markerImage // 마커이미지 설정
                        });

                        marker.setMap(map);
                        markers.push(marker)


                        kakao.maps.event.addListener(marker, 'click', function (e) {


                            controller.titleTarget.innerHTML = markerTitle
                            controller.addressTarget.innerHTML = marketAddress
                            controller.stockAtTarget.innerHTML = markerStockAt
                            controller.remainStatTarget.innerHTML = remainStat
                            controller.createdAtTarget.innerHTML = createdAt

                            $('#myModal').modal('show');
                            map.panTo(markerPosition);
                        })
                        $('#progressBar').fadeOut()
                    })

                },
                error: function (e) {

                }
            })
        });


    }
}
