import {Controller} from "stimulus"

export default class extends Controller{
    static get targets() {
        return [ "map", "modal", "title", "address", "loadSearch"]
    }

    connect() {
        var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png', // 마커이미지의 주소입니다
            imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
            imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        var markers = [];
        this.loadMyLocation()
        let controller = this

        $('#progressBar').fadeOut()

        //- view에 카카오 지도를 뿌림
        var Cheight = $(window).height();
        $('#map-size').css({'height':Cheight+'px'});

        //- 지도 초창기 셋팅
        var options = {
            center: new kakao.maps.LatLng(37.2788, 126.953),
            level: 2,
            maxLevel: 3
        };

        //- 맵성 객체 생성
        var map = new kakao.maps.Map(this.mapTarget, options)

        //- 화면 이동시 해당 화면의 좌표값을 받아옵니다.
        kakao.maps.event.addListener(map, 'dragend', function() {
            var latlng = map.getCenter();
            var x = latlng.getLat()
            var y = latlng.getLng()
            var Cheight = $(window).height();
            $('#progressBar').css({'margin-top':Cheight/2.5+'px'});
            $('#progressBar').fadeIn()


            //- 1. ajax를 이용하여 x,y축 좌표값을 보낸다.
            //- 2. rails에서 위치값을 계산 한 후 response값으로 리턴
            $.ajax({
                url : `sites/search_sites?lat=${x}&lng=${y}`,
                type : "GET",
                dataType: "json",
                success: function(args) {
                    console.log(markers)

                    for (var index = 0; index < markers.length; index++){
                        markers[index].setMap(null)
                    }
                    var parseSite  = args.data

                    //- 받아온 데이터를 for문을 이용하여 마커를 추가해준다
                    parseSite.forEach(function (k) {
                        var markerPosition  = new kakao.maps.LatLng(k["lat"], k["lng"]);
                        var markerTitle = k["name"]
                        var marketAddress = k["address"]

                        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)

                        var marker = new kakao.maps.Marker({
                            position: markerPosition,
                            image: markerImage // 마커이미지 설정
                        });

                        marker.setMap(map);
                        markers.push(marker)

                        kakao.maps.event.addListener(marker, 'click', function (e) {
                            controller.titleTarget.innerHTML = markerTitle
                            controller.addressTarget.innerHTML = marketAddress
                            $('#myModal').modal('show');
                            map.panTo(markerPosition);
                        })
                        $('#progressBar').fadeOut()
                    })
                },
                error : function(xhr, status, error){
                    //요청에 실패하면 에러코드 출력
                    alert("에러코드 : " + xhr.status);
                }
            });
        });
    }



    //- geolocation을 이용하여 나의 위치를 받아온다
    loadMyLocation(){
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position.coords.latitude + ' ' + position.coords.longitude);
        }, function(error) {
            console.error(error);
        }, {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: Infinity
        });
    }


    loadSearchToKakaoMap(){
        var siteAddress = this.addressTarget
        var searchButton = document.getElementById("searchButton")
        console.log(siteAddress.innerText)
        searchButton.href = `https://map.kakao.com/link/search/${siteAddress.innerText}`
    }

    clearMarker(markers){
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
    }
}