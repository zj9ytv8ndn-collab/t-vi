
'use strict';
/* ============ DỮ LIỆU BÁT QUÁI ============ */
const TRI=[
 {key:'QIAN',sym:'☰',name:'Càn',han:'乾',el:'Kim',nat:'Thiên',bin:'111',lt:6,dir:'Tây Bắc'},
 {key:'DUI', sym:'☱',name:'Đoài',han:'兌',el:'Kim',nat:'Trạch',bin:'110',lt:7,dir:'Tây'},
 {key:'LI',  sym:'☲',name:'Ly',han:'離',el:'Hỏa',nat:'Hỏa',bin:'101',lt:9,dir:'Nam'},
 {key:'ZHEN',sym:'☳',name:'Chấn',han:'震',el:'Mộc',nat:'Lôi',bin:'100',lt:3,dir:'Đông'},
 {key:'XUN', sym:'☴',name:'Tốn',han:'巽',el:'Mộc',nat:'Phong',bin:'011',lt:4,dir:'Đông Nam'},
 {key:'KAN', sym:'☵',name:'Khảm',han:'坎',el:'Thủy',nat:'Thủy',bin:'010',lt:1,dir:'Bắc'},
 {key:'GEN', sym:'☶',name:'Cấn',han:'艮',el:'Thổ',nat:'Sơn',bin:'001',lt:8,dir:'Đông Bắc'},
 {key:'KUN', sym:'☷',name:'Khôn',han:'坤',el:'Thổ',nat:'Địa',bin:'000',lt:2,dir:'Tây Nam'}
];
const TBYBIN={};TRI.forEach(function(t,i){TBYBIN[t.bin]=i;});
/* Bảng tra 8x8: hàng = thượng quái, cột = hạ quái */
const HEXMAT=[
 [1,10,13,25,44,6,33,12],
 [43,58,49,17,28,47,31,45],
 [14,38,30,21,50,64,56,35],
 [34,54,55,51,32,40,62,16],
 [9,61,37,42,57,59,53,20],
 [5,60,63,3,48,29,39,8],
 [26,41,22,27,18,4,52,23],
 [11,19,36,24,46,7,15,2]
];
/* ============ DỮ LIỆU 64 QUẺ ============ */
const HX=[
{n:1,name:'Càn Vi Thiên',han:'乾為天',up:0,lo:0,
 t:'Càn: Nguyên, hanh, lợi, trinh.',
 m:'Sáu hào dương thuần túy, khí Càn cương kiện như trời vận hành không ngừng. Thời vận đang ở cực thịnh, quân tử tự cường bất tức; song cực thịnh tất ẩn mầm suy, phải biết khiêm nhường giữ mình.',
 c:'Sự nghiệp thuận gió căng buồm, có quý nhân phù trợ; chớ kiêu ngạo mà mất đạo.',
 w:'Tài lộc dồi dào, lợi đầu tư lớn; song phải biết điểm dừng, tham thì thâm.',
 l:'Tình cảm chủ động mạnh mẽ; cương quá dễ gãy, cần mềm mỏng để bền lâu.',
 h:'Khí huyết vượng thịnh; coi chừng đầu mục, tăng huyết áp do dương khí quá thịnh.'},
{n:2,name:'Khôn Vi Địa',han:'坤為地',up:7,lo:7,
 t:'Khôn: Nguyên hanh, lợi tẩm mã chi trinh.',
 m:'Sáu hào âm thuần túy, đức Địa nhu thuận bao dung chở che vạn vật. Thuận theo thiên thời thì hanh thông, cố làm chủ tất lạc đường; giữ nết nhu hậu mới thành đại sự.',
 c:'Nên làm cánh tay đắc lực, phối hợp thuận theo người tài; tự xưng đầu lĩnh ắt bại.',
 w:'Tài lộc chậm mà bền, tích tiểu thành đại; tránh đầu cơ mạo hiểm.',
 l:'Tình duyên êm ấm bao dung; cần kiên nhẫn vun đắp, đừng tranh hơn thua.',
 h:'Chú ý tỳ vị, đường tiêu hóa; nghỉ ngơi điều độ, dưỡng âm tĩnh khí.'},
{n:3,name:'Thủy Lôi Truân',han:'水雷屯',up:5,lo:3,
 t:'Truân: Nguyên hanh, lợi trinh; vật dụng hữu du vãng, lợi kiến hầu.',
 m:'Sấm nổ dưới nước, vạn vật mới nảy mầm giữa muôn trùng gian nan. Ban đầu trăn trở khó khăn, chớ vội tiến; tích lũy lực lượng, tìm bạn đồng hành thì tất thành.',
 c:'Khởi nghiệp vất vả, dễ vướng sai lầm; nên cầu trợ lực, dựng căn cơ cho vững.',
 w:'Tài khó nhọc, tiền chưa về; giữ chặt vốn, chớ cho vay lúc này.',
 l:'Tình mới chớm còn ngổn ngang; chậm rãi tìm hiểu, tránh nóng vội.',
 h:'Sức yếu ở giai đoạn đầu; bồi dưỡng thận khí và huyết dịch.'},
{n:4,name:'Sơn Thủy Mông',han:'山水蒙',up:6,lo:5,
 t:'Mông: Hanh; phỉ ngã cầu đồng mông, đồng mông cầu ngã.',
 m:'Suối chảy dưới chân núi, tượng trẻ thơ cần khai mông. Việc chưa rõ ràng, nên cầu học người hiền; thành tâm vấn đạo, thầy trò tương ứng thì khai sáng.',
 c:'Thiếu kinh nghiệm, nên tìm thầy giỏi học nghề; chuyên tâm đồ nghiệp mới tiến.',
 w:'Tài vận mờ mịt, chớ nghe lời dụ đầu tư; học cách quản tài trước đã.',
 l:'Đối phương còn non nớt, chưa thấu tâm; cần thời gian giác ngộ lẫn nhau.',
 h:'Coi chừng bệnh do thiếu hiểu biết chăm sóc; nên khám sức khỏe định kỳ.'},
{n:5,name:'Thủy Thiên Nhu',han:'水天需',up:5,lo:0,
 t:'Nhu: Hữu phu, quang hanh, trinh cát; lợi thiệp đại xuyên.',
 m:'Mây tụ trên trời, mưa chưa đổ xuống — tượng chờ đợi thời cơ. Giữ chữ tín, an nhiên dưỡng sức, không nóng vội; thời đến thì vượt biển lớn cũng thành.',
 c:'Chưa đến lúc hành động; kiên nhẫn chờ cơ hội, chuẩn bị thật kỹ lưỡng.',
 w:'Tài đến chậm; giữ vững kế hoạch, đừng rút vốn giữa chừng.',
 l:'Tình duyên cần thời gian; thành thật chờ đợi, duyên tới sẽ đậm sâu.',
 h:'Bình ổn; chú ý bổ sung nước, coi sóc thận và bàng quang.'},
{n:6,name:'Thiên Thủy Tụng',han:'天水訟',up:0,lo:5,
 t:'Tụng: Hữu phu trất, dĩ tích; trung cát, chung hung; lợi kiến đại nhân, bất lợi thiệp đại xuyên.',
 m:'Trời đi lên, nước chảy xuống, hai bề trái chiều nên sinh tranh tụng. Dừng giữa chừng thì cát, tranh đến cùng thì hung; nên hòa giải, nhờ người đức lớn phân xử.',
 c:'Dễ vướng tranh chấp, kiện tụng; nhượng bộ giữ hòa khí, tránh cứng đối cứng.',
 w:'Tranh đoạt tài sản bất lợi; rút lui sớm, chớ tham thắng hơn.',
 l:'Khẩu thiệt thị phi; hạ giọng nhường nhịn, đừng tranh đúng sai.',
 h:'Tâm thần bất an; tránh nóng giận, đề phòng suy nhược thần kinh.'},
{n:7,name:'Địa Thủy Sư',han:'地水師',up:7,lo:5,
 t:'Sư: Trinh, trượng nhân cát, vô cữu.',
 m:'Nước chứa trong lòng đất — tượng quân đội ẩn trong dân. Muốn thành đại sự cần kỷ luật nghiêm minh, người lãnh đạo lão luyện; xuất binh phải chính danh.',
 c:'Hợp tác đoàn đội có tổ chức thì thắng; cần người chỉ huy có uy tín.',
 w:'Tài lợi từ tập thể, làm ăn quy mô; chia lãi minh bạch kẻo sinh loạn.',
 l:'Tình có đối thủ cạnh tranh; chính trực kiên định mới giữ được người.',
 h:'Đề phòng bệnh lây qua đám đông; giữ sức đề kháng, vệ sinh kỹ.'},
{n:8,name:'Thủy Địa Tỷ',han:'水地比',up:5,lo:7,
 t:'Tỷ: Cát; nguyên bật, nguyên vĩnh trinh, vô cữu; bất ninh phương lai, hậu phu hung.',
 m:'Nước trên mặt đất, đất nước nương nhau mà sống — tượng thân phụ hòa hợp. Gắn bó đúng người đúng việc thì đại cát; chậm trễ kẻo hết duyên.',
 c:'Quý nhân tương trợ, đồng sự hòa thuận; nên chủ động liên minh từ sớm.',
 w:'Tài nhờ hợp tác mà sinh; chọn bạn tin cậy, lãi chia đôi thì bền.',
 l:'Giai đoạn tình ý khăng khít; thổ lộ chân thành sẽ nên đôi.',
 h:'Ổn định; cùng người thân sinh hoạt điều độ, tránh cô độc lâu ngày.'},
{n:9,name:'Phong Thiên Tiểu Súc',han:'風天小畜',up:4,lo:0,
 t:'Tiểu Súc: Hanh; mật vân bất vũ, tự ngã tây giao.',
 m:'Gió trên trời, mây dày mà mưa chưa đổ — tượng súc tích nhỏ. Lực chưa đủ, đức còn mỏng; tu bồi từng chút, lấy nhu hòa hóa giải cản trở.',
 c:'Tiến độ chậm, nhiều việc dang dở; kiên trì chỉnh đốn từng chi tiết nhỏ.',
 w:'Tích góp được ít; chưa thể tiêu lớn, giữ ngân sách thật chặt.',
 l:'Tình còn e ngại, chưa thể bộc lộ; êm ái dần dần sẽ thấm vào lòng.',
 h:'Nhức mỏi do phong tà; chú ý hệ hô hấp và gan mật.'},
{n:10,name:'Thiên Trạch Lý',han:'天澤履',up:0,lo:1,
 t:'Lý: Lý hổ vĩ, bất chạp nhân, hanh.',
 m:'Giẫm lên đuôi hổ mà không bị cắn — tượng lấy nhu lễ đi giữa hiểm nguy. Cư xử đúng lễ nghi, tôn ti trật tự, biết mình biết người thì qua hiểm an toàn.',
 c:'Địa vị chênh lệch, phải biết lễ phép; khiêm cung nhẫn nhịn ắt qua cửa ải.',
 w:'Tài có hiểm kèm theo; ký kết rõ ràng, đi đúng luật thì không lo.',
 l:'Chênh lệch hoàn cảnh hai bên; tôn trọng lẫn nhau thì duyên mới bền.',
 h:'Coi chừng chân tay, té ngã; cẩn thận khi di chuyển, leo trèo.'},
{n:11,name:'Địa Thiên Thái',han:'地天泰',up:7,lo:0,
 t:'Thái: Tiểu vãng đại lai, cát hanh.',
 m:'Trời dưới đất, âm dương giao hòa, vạn vật hanh thông. Thời thế thuận hòa, cát tường rộng mở; nhưng thái cực noãn bĩ, phải lo giữ gìn cho bền.',
 c:'Công danh thuận lợi, trên dưới đồng tâm; nhân lúc thịnh mà tính đường xa.',
 w:'Tài nguyên rộng mở, buôn bán hanh thông; nhớ gieo phúc khi đắc lợi.',
 l:'Âm dương tương hòa, hôn sự đại cát; trăm năm giai lão.',
 h:'Khí huyết lưu thông; duy trì điều độ, đừng chủ quan lơ là.'},
{n:12,name:'Thiên Địa Bĩ',han:'天地否',up:0,lo:7,
 t:'Bĩ: Bĩ chi phỉ nhân, bất lợi quân tử trinh; đại vãng tiểu lai.',
 m:'Trời đất không giao, vạn vật bế tắc. Thời vận tắc nghẽn, tiểu nhân đắc thế; quân tử thu liễm giữ tiết tháo, âm thầm chờ thời.',
 c:'Công việc trì trệ, thị phi đầy rẫy; ẩn mình tu đức, chớ chống trả.',
 w:'Tài lộ bế tắc, hao tán; siết chặt chi tiêu, tránh mọi đầu tư.',
 l:'Tình nguội lạnh, tâm không thông; im lặng chờ thời, đừng ép duyên.',
 h:'Khí trệ huyết ứ; chú ý tuần hoàn máu, trầm uất kéo dài.'},
{n:13,name:'Thiên Hỏa Đồng Nhân',han:'天火同人',up:0,lo:2,
 t:'Đồng Nhân: Đồng nhân vu dã, hanh; lợi thiệp đại xuyên, lợi quân tử trinh.',
 m:'Lửa đồng với trời, ánh sáng chiếu khắp nơi — tượng đồng tâm hiệp lực. Cùng người chí công vô tư thì làm nên việc lớn; kỵ bè phái chia rẽ.',
 c:'Hợp tác đại cát, cộng đồng ủng hộ; giữ chí công thì danh lợi song toàn.',
 w:'Làm ăn chung lời lãi dồi dào; minh bạch công bằng mới lâu dài.',
 l:'Tâm đầu ý hợp, bạn bè mai mối tốt; tình quang minh chính đại.',
 h:'Tinh thần sảng khoái; nên tập luyện cùng nhóm bạn bè.'},
{n:14,name:'Hỏa Thiên Đại Hữu',han:'火天大有',up:2,lo:0,
 t:'Đại Hữu: Nguyên hanh.',
 m:'Mặt trời trên trời cao, ánh sáng rực rỡ bốn phương — tượng giàu có lớn. Của cải danh vọng đều đủ; giữ đức khiêm, thuận thiên hưu mệnh thì phúc trường tồn.',
 c:'Đại thành công, uy tín vang xa; dùng người hiền để giữ cơ nghiệp.',
 w:'Tài lộc cực thịnh; nên bố thí tích đức, tránh phô trương.',
 l:'Được người tài sắc yêu mến; chớ kiêu căng mà quên nghĩa.',
 h:'Dương quá dễ sinh nhiệt; thanh nhiệt giải độc, giữ tâm mát lành.'},
{n:15,name:'Địa Sơn Khiêm',han:'地山謙',up:7,lo:6,
 t:'Khiêm: Hanh, quân tử hữu chung.',
 m:'Núi cao nằm dưới đất — tượng người tài mà khiêm tốn. Khiêm nhường thì trời giúp, người quý; giữ đức ấy đến cùng ắt thành danh.',
 c:'Hạ mình học hỏi được quý nhân nâng đỡ; công lao tự đến, không cần tranh.',
 w:'Tài lợi vừa đủ, không tranh đoạt; tích đức sinh tài về sau.',
 l:'Nhún nhường được lòng người; khiêm cung chân thành, duyên mỹ mãn.',
 h:'Tâm bình khí hòa, ít bệnh; tránh lao quá sức.'},
{n:16,name:'Lôi Địa Dự',han:'雷地豫',up:3,lo:7,
 t:'Dự: Lợi kiến hầu, hành sư.',
 m:'Sấm nổ trên mặt đất, vạn vật vui động — tượng an dự hưởng lạc. Niềm vui phải có độ, mưu sự phải chuẩn bị sẵn; lạc cực sinh bi, chớ đam mê quên việc.',
 c:'Thuận lợi mở mang, được lòng người; nhưng phải phòng biến, đừng lơ là.',
 w:'Tài vào dễ, ra cũng nhanh; kiểm soát hưởng thụ, giữ phần dự phòng.',
 l:'Vui vẻ tự do, nhiều người theo; đừng để cảm xúc bồng bột dẫn đường.',
 h:'Hưng phấn quá độ hại tâm thần; ngủ đủ giấc, tiết chế vui chơi.'},
{n:17,name:'Trạch Lôi Tùy',han:'澤雷隨',up:1,lo:3,
 t:'Tùy: Nguyên hanh, lợi trinh, vô cữu.',
 m:'Sấm trong đầm, dương động âm vui theo — tượng tùy thời thuận thế. Biết theo người hiền, thuận thiên thời thì hanh thông; tùy mà giữ chính mới vô cữu.',
 c:'Thuận theo dòng chảy thời cuộc, theo người tài mà học; chớ cố chấp.',
 w:'Tài theo cơ hội đến; nhanh tay nắm bắt, đừng trì hoãn.',
 l:'Thuận duyên tự nhiên; duyên tới thì mở lòng đón, chớ gượng ép.',
 h:'Sinh hoạt theo tiết khí; ăn ngủ đúng giờ, bệnh tự tan.'},
{n:18,name:'Sơn Phong Cổ',han:'山風蠱',up:6,lo:4,
 t:'Cổ: Nguyên hanh, lợi thiệp đại xuyên.',
 m:'Gió dưới núi, khí ứ không thông — tượng việc lâu ngày hư hỏng cần chỉnh đốn. Dũng cảm cải tổ cái cũ, kế thừa cái hay bỏ cái dở, ắt đại hanh.',
 c:'Cơ cấu lục đục cần canh tân; tiếp quản, sửa sai đúng lúc.',
 w:'Tài bị hao mòn do quản lý dở; xem lại sổ sách, thu hồi nợ cũ.',
 l:'Tình cũ lục đục, hiểu lầm tích lũy; dứt khoát giải quyết hoặc buông.',
 h:'Bệnh cũ tái phát; trị tận gốc, thay đổi sinh hoạt.'},
{n:19,name:'Địa Trạch Lâm',han:'地澤臨',up:7,lo:1,
 t:'Lâm: Nguyên hanh, lợi trinh; chí vu bát nguyệt hữu hung.',
 m:'Đất cao trên đầm, dương khí lớn dần — tượng người trên cảm hóa kẻ dưới. Thời vận đang lên, nên thân cận mọi người, dạy bảo không mệt; song phải lo tính đường lùi.',
 c:'Được trọng dụng lãnh đạo; đối xử hậu hĩ với cấp dưới thì nghiệp vững.',
 w:'Tài lộc đang tới gần; tranh thủ thời cơ, đừng chậm trễ.',
 l:'Tình cảm ấm áp, được chiều chuộng; chủ động quan tâm sẽ thắng.',
 h:'Khí sắc hồi phục; duy trì dưỡng sinh, đừng lơi lỏng.'},
{n:20,name:'Phong Địa Quan',han:'風地觀',up:4,lo:7,
 t:'Quan: Quán nhi bất tiến, hữu phu ngung nhược.',
 m:'Gió thổi khắp mặt đất — tượng quan sát chiêm nghiệm. Việc nên lùi lại nhìn tổng thể, xét lại đức hạnh; hiểu rõ thế trời đất rồi mới định động tĩnh.',
 c:'Quan sát tình hình trước khi quyết; làm gương cho người khác thì uy tín tăng.',
 w:'Chưa nên xuống tiền; nghiên cứu kỹ thị trường, học người thành công.',
 l:'Nhìn kỹ tâm tính đối phương; duyên đẹp cần thời gian chiêm nghiệm.',
 h:'Theo dõi cơ thể, khám tổng quát; nhìn nhận bệnh sớm mà phòng.'},
{n:21,name:'Hỏa Lôi Phệ Hạp',han:'火雷噬嗑',up:2,lo:3,
 t:'Phệ Hạp: Hanh; lợi dụng ngục.',
 m:'Sấm chớp hợp uy, nhai gãy vật cản trong miệng — tượng dùng hình pháp dẹp trở ngại. Có chướng ngại phải quyết liệt phá bỏ, nhưng phải minh chính, không tàn nhẫn.',
 c:'Có kẻ ngáng đường, phải cứng rắn xử lý; dùng pháp lý chính đáng thì thắng.',
 w:'Gỡ được nút thắt tài chính; thu hồi nợ, đòi nợ có lợi.',
 l:'Chướng ngại giữa hai người cần nói thẳng; bỏ qua cái cũ mới hàn gắn.',
 h:'Răng miệng, tiêu hóa tắc nghẽn; chú ý ăn uống, nên khám răng.'},
{n:22,name:'Sơn Hỏa Bí',han:'山火賁',up:6,lo:2,
 t:'Bí: Hanh; tiểu lợi hữu du vãng.',
 m:'Lửa sáng dưới chân núi, văn vẻ trang sức — tượng văn sức tô điểm. Hình thức đẹp giúp việc hanh, nhưng chất phải đi đôi với văn; đẹp mà không thực thì hư.',
 c:'Chăm chút hình ảnh, thương hiệu có lợi; nhưng nội dung mới là gốc.',
 w:'Tài lợi nhỏ nhờ giao tế, nghệ thuật; tránh tiêu xài phô trương.',
 l:'Đẹp mã bên ngoài thu hút; tình bền cần tâm hồn tương xứng.',
 h:'Da dẻ, thẩm mỹ được chú ý; giữ vẻ thanh nhã tự nhiên.'},
{n:23,name:'Sơn Địa Bác',han:'山地剝',up:6,lo:7,
 t:'Bác: Bất lợi hữu du vãng.',
 m:'Núi bị bóc lở từng lớp, năm âm bóc một dương — tượng suy tàn đến tận cùng. Thời thế bất lợi, chớ tiến; thu liễm bảo toàn gốc rễ, chờ quay về.',
 c:'Cơ nghiệp lung lay; rút về giữ thực lực, chớ mở mang lúc này.',
 w:'Tài bị bóc dần, hao tổn; cắt lỗ sớm, giữ của cốt lõi.',
 l:'Tình phai nhạt, người ý hờ hững; chấp nhận buông, giữ lại tự tôn.',
 h:'Sức khỏe suy kiệt dần; đại bổ dưỡng, tuyệt đối nghỉ ngơi.'},
{n:24,name:'Địa Lôi Phục',han:'地雷復',up:7,lo:3,
 t:'Phục: Hanh; xuất nhập vô tật, bằng lai vô cữu; thất nhật lai phục, lợi hữu du vãng.',
 m:'Sấm động trong lòng đất, một dương trở lại sau bảy ngày — tượng khôi phục. Cực suy chuyển thịnh, bệnh lành việc vãn hồi; thuận tự nhiên chớ vội vàng.',
 c:'Cơ hội trở lại, người cũ quay về giúp đỡ; khởi động lại từng bước.',
 w:'Tài lộc hồi sinh; tiền cũ có thể thu hồi, buôn bán lại hanh.',
 l:'Tình cũ quay về, rạn nứt được hàn gắn; tha thứ mở lòng.',
 h:'Bệnh chuyển biến tốt, dương khí hồi; dưỡng sinh đúng cách.'},
{n:25,name:'Thiên Lôi Vô Vọng',han:'天雷無妄',up:0,lo:3,
 t:'Vô Vọng: Nguyên hanh, lợi trinh; kỳ phỉ chính hữu sảnh, bất lợi hữu du vãng.',
 m:'Sấm động dưới trời, vạn vật theo lẽ thật — tượng không vọng tưởng. Giữ tâm chân chính, không cầu phi phận; làm đúng trời phù, làm trái họa tới.',
 c:'Chớ dụng tâm cơ, thành thật làm việc; danh lợi tự đến không cần mưu.',
 w:'Tránh đầu tư mạo hiểm, lừa lọc; tài chính trong sạch mới yên.',
 l:'Chân thành không dối trá; duyên thật tự nhiên đến, gượng ép tất tan.',
 h:'Đừng uống thuốc bậy bạ; tin vào tự nhiên, điều dưỡng từ từ.'},
{n:26,name:'Sơn Thiên Đại Súc',han:'山天大畜',up:6,lo:0,
 t:'Đại Súc: Lợi trinh; bất gia thực cát, lợi thiệp đại xuyên.',
 m:'Trời chứa trong núi — tượng súc tích lớn về đức lẫn tài. Nên dừng lại tích lũy học vấn, nuôi dưỡng đức lớn; thời chín muồi vượt biển cũng thành.',
 c:'Tích lũy chuyên môn, chờ cơ hội lớn; học hỏi không ngừng ắt đắc dụng.',
 w:'Tiết kiệm đầu tư dài hạn sinh lời lớn; mua tích trữ tài sản có lợi.',
 l:'Tình sâu nặng nhưng chậm chạp; vun đắp lâu dài, chớ nôn nóng.',
 h:'Bồi bổ dưỡng thể rất hợp; ăn uống đầy đủ, ngủ nghỉ điều độ.'},
{n:27,name:'Sơn Lôi Di',han:'山雷頤',up:6,lo:3,
 t:'Di: Trinh cát; quán di, tự cầu khẩu thực.',
 m:'Sấm dưới núi, tượng cái miệng nhai nuốt — nghĩa là dưỡng sinh. Coi chừng lời ăn miệng nói; tự lực nuôi thân dưỡng đức, cẩn thận khẩu nhập tà xuất.',
 c:'Giữ lời ăn tiếng nói, đừng thị phi; tự lo liệu cơm áo chớ ỷ lại.',
 w:'Tài do miệng cơm mà ra; kinh doanh ăn uống, ẩm thực có lợi.',
 l:'Lời ngọt dễ mất lòng tin; nuôi dưỡng tình bằng hành động chân thật.',
 h:'Ăn uống là gốc của bệnh hay thuốc; điều độ thực đơn, tránh thức độc.'},
{n:28,name:'Trạch Phong Đại Quá',han:'澤風大過',up:1,lo:4,
 t:'Đại Quá: Đống nạo; lợi hữu du vãng, hanh.',
 m:'Đầm nước dâng ngập cây, dầm nhà võng gãy — tượng gánh nặng quá sức. Tình thế bất thường đòi hành động phi thường; phải dứt khoát thay đổi trước khi sụp đổ.',
 c:'Áp lực chồng chất quá tải; phải cải cách mạnh hoặc buông bớt, kẻo gãy.',
 w:'Vay nợ quá sức nguy hiểm; giảm đòn bẩy, bán bớt tài sản giữ an toàn.',
 l:'Chênh lệch lớn gánh không nổi; hoặc tìm cách cân bằng, hoặc dứt.',
 h:'Cột sống, xương khớp chịu lực nặng; nghỉ ngơi tuyệt đối, tránh kiệt sức.'},
{n:29,name:'Khảm Vi Thủy',han:'坎為水',up:5,lo:5,
 t:'Tập Khảm: Hữu phu, duy tâm hanh, hành hữu thượng.',
 m:'Nước chồng nước, hiểm trùng hiểm — tượng gian khổ tầng tầng. Giữ lòng thành tín xuyên suốt, học tập không ngừng; nước chảy mãi mặc hố sâu, tâm kiên thì thoát hiểm.',
 c:'Khó khăn chồng chất; bền chí vượt qua, học kinh nghiệm thì qua ải.',
 w:'Tài bị cuốn vào vực xoáy; giữ tiền mặt, tuyệt đối không đầu tư.',
 l:'Tình chìm trong lo âu; thành tâm bảo vệ nhau qua cơn sóng gió.',
 h:'Thận, bàng quang, máu huyết cần kiểm tra; tránh lạnh, uống đủ nước.'},
{n:30,name:'Ly Vi Hỏa',han:'離為火',up:2,lo:2,
 t:'Ly: Lợi trinh, hanh; súc tẫn ngưu cát.',
 m:'Lửa chồng lửa, ánh sáng kép soi tỏ bốn phương — tượng văn minh bám nơi chính. Trí tuệ sáng suốt cần nương vào chính đạo; nhu thuận như bò cái thì cát tường.',
 c:'Danh tiếng rực rỡ, trí tuệ được trọng; bám chính đạo mới bền lâu.',
 w:'Tài sáng nhưng dễ cháy nhanh; quản lý chặt, tránh khoe khoang.',
 l:'Tình nồng cháy mãnh liệt; cần nhu hòa để lửa ấm mà không thiêu.',
 h:'Tim mạch, mắt cần chú ý; tránh nóng trong người, giữ tâm tĩnh.'},
{n:31,name:'Trạch Sơn Hàm',han:'澤山咸',up:1,lo:6,
 t:'Hàm: Hanh, lợi trinh; thú nữ cát.',
 m:'Đầm trên núi, sơn trạch thông khí — tượng nam nữ cảm ứng. Giao cảm chân thành không mưu mẹo thì hanh thông; cầu hôn lấy vợ đại cát.',
 c:'Cảm thông với đồng nghiệp, đối tác tin tưởng; hợp tác thành công rực rỡ.',
 w:'Tài đến nhờ quan hệ tốt; khách hàng mến mộ, buôn bán thuận.',
 l:'Đào hoa đại vượng, hai tâm tương cảm; tiến tới hôn nhân viên mãn.',
 h:'Khí huyết điều hòa; giữ tâm vui, tránh quá độ cảm xúc.'},
{n:32,name:'Lôi Phong Hằng',han:'雷風恆',up:3,lo:4,
 t:'Hằng: Hanh, vô cữu, lợi trinh, lợi hữu du vãng.',
 m:'Sấm gió tương tùy, đạo trường tồn — tượng bền chí lâu dài. Lập chí không đổi, theo đuổi đến cùng; nhưng hằng phải biết biến, cứng nhắc tất hỏng.',
 c:'Kiên trì con đường đã chọn ắt thành; đừng đứng núi này trông núi nọ.',
 w:'Tài ổn định lâu dài; đầu tư dài hạn, không đổi giữa chừng.',
 l:'Tình bền vợ chồng hòa thuận; giữ đạo thường tình thì trăm năm.',
 h:'Sinh hoạt thường nhật đều đặn là thuốc tiên; duy trì thói quen tốt.'},
{n:33,name:'Thiên Sơn Độn',han:'天山遯',up:0,lo:6,
 t:'Độn: Hanh; tiểu lợi trinh.',
 m:'Trời xa núi — tượng quân tử lánh xa tiểu nhân khi âm trường dương tiêu. Thời thế nên lui, rút lui đúng lúc là trí; giữ khoảng cách, nghiêm mà không ác.',
 c:'Nên thoái lui khỏi tranh đấu; bảo toàn thanh danh, chờ thời mới tái xuất.',
 w:'Thu hẹp buôn bán, cất vốn an toàn; đừng ham lời trước mắt.',
 l:'Khoảng cách cần thiết để suy ngẫm; ép gần nhau lúc này tất sinh phiền.',
 h:'Nghỉ dưỡng nơi thanh tịnh; xa náo nhiệt, dưỡng tinh thần.'},
{n:34,name:'Lôi Thiên Đại Tráng',han:'雷天大壯',up:3,lo:0,
 t:'Đại Tráng: Lợi trinh.',
 m:'Sấm nổ trên trời, uy dương cực thịnh — tượng sức mạnh lớn lao. Mạnh mà giữ chính mới lợi; dùng sức phi lễ tất rước họa, chạm đâu vỡ đó.',
 c:'Thế lực hùng mạnh, tiến quân đúng chính đạo; chớ lấn lướt, cậy mạnh.',
 w:'Tài lực dồi dào; đầu tư mạnh được nhưng phải hợp pháp, đừng lạm quyền.',
 l:'Chủ động quá mức dễ làm đối phương sợ; mạnh mẽ mà ôn nhu mới thắng.',
 h:'Sức khỏe sung mãn; tránh chấn thương do quá lực, chú ý chân tay.'},
{n:35,name:'Hỏa Địa Tấn',han:'火地晉',up:2,lo:7,
 t:'Tấn: Khang hầu dụng tích mã phiên thứ, trú nhật tam tiếp.',
 m:'Mặt trời mọc trên đất, ánh sáng tiến lên — tượng thăng tiến hiển đạt. Thuận theo đức sáng mà tiến, được bề trên tin dùng; giữ mình nhu thuận ắt vinh.',
 c:'Thăng quan tiến chức, được quý nhân phò trợ; nắm lấy thời cơ thăng tiến.',
 w:'Tài lộc tăng tiến rõ rệt; mở rộng buôn bán, ký kết đều lợi.',
 l:'Tình tiến triển tốt đẹp, ngày càng thắm thiết; cầu hôn thuận lợi.',
 h:'Sức khỏe tiến triển lành; ra nắng vận động, tinh thần sảng khoái.'},
{n:36,name:'Địa Hỏa Minh Di',han:'地火明夷',up:7,lo:2,
 t:'Minh Di: Lợi gian trinh.',
 m:'Ánh sáng chìm vào lòng đất — tượng bậc minh quân bị tổn thương trong thời tối tăm. Thu lấp tài trí, ngoài thuận trong chính; gian nan mà giữ trinh ắt qua.',
 c:'Thời loạn nên ẩn tàng tài năng; chớ phô trương kẻo rước họa, chờ thời.',
 w:'Tài vận tối tăm, giữ kín của cải; tránh cho vay, đầu tư lúc này.',
 l:'Tình bị chèn ép, hiểu lầm; nhẫn nhịn giữ chân tâm, thời sẽ sáng.',
 h:'Sức khỏe suy yếu, trầm cảm; nghỉ ngơi tĩnh dưỡng, giữ niềm tin.'},
{n:37,name:'Phong Hỏa Gia Nhân',han:'風火家人',up:4,lo:2,
 t:'Gia Nhân: Lợi nữ trinh.',
 m:'Gió từ lửa sinh ra — tượng gia đạo chính thì thiên hạ định. Mỗi người đúng phận sự, lời nói có thực, việc làm có thường; gia hòa vạn sự hưng.',
 c:'Lo tốt việc nội bộ, tổ chức; gia đình yên ấm thì sự nghiệp thăng.',
 w:'Tài từ gia nghiệp, buôn bán gia đình; quản lý chi tiêu nghiêm minh.',
 l:'Hôn nhân gia đình hạnh phúc; vợ chồng giữ đạo, gương mẫu cho nhau.',
 h:'Ăn uống gia đình điều độ giữ sức; tránh tích tụ bực dọc trong nhà.'},
{n:38,name:'Hỏa Trạch Khuê',han:'火澤睽',up:2,lo:1,
 t:'Khuê: Tiểu sự cát.',
 m:'Lửa bốc lên, đầm thấm xuống, hai nữ đồng mà chí khác — tượng chia lìa đối lập. Thời kỳ nghịch lý, chỉ nên làm việc nhỏ; cầu đồng trong dị, tìm điểm tương đồng.',
 c:'Bất đồng ý kiến nhiều; làm việc nhỏ riêng lẻ được, đại sự chưa hợp.',
 w:'Tài lợi nhỏ lẻ; hợp tác lớn dễ tan rã, mỗi người một ngả.',
 l:'Tình có khác biệt lớn, hiểu lầm; tôn trọng sự khác biệt mới hòa được.',
 h:'Khí huyết trái chiều; chú ý mắt, tim và tiêu hóa lệch nhịp.'},
{n:39,name:'Thủy Sơn Kiển',han:'水山蹇',up:5,lo:6,
 t:'Kiển: Lợi tây nam, bất lợi đông bắc; lợi kiến đại nhân, trinh cát.',
 m:'Nước trên núi cao, đường đi hiểm trở khập khiễng — tượng gian nan lớn. Gặp cản nên dừng xét lại mình; tìm đại nhân chỉ đường, tránh nơi hiểm mà đi.',
 c:'Trở ngại trùng trùng; dừng bước tu thân, cầu người tài dẫn dắt.',
 w:'Tài bế tắc, đường đi nguy hiểm; giữ nguyên trạng, đừng mạo hiểm.',
 l:'Đường tình gập ghềnh; cần người mai mối khôn ngoan, chớ tự tiến.',
 h:'Chân tay bất tiện, khớp xương đau; kiên nhẫn trị liệu dài hạn.'},
{n:40,name:'Lôi Thủy Giải',han:'雷水解',up:3,lo:5,
 t:'Giải: Lợi tây nam; vô sở vãng, kỳ lai phục cát; hữu du vãng, túc cát.',
 m:'Sấm mưa rào tươi tắn, giải tỏa sầu đau — tượng khó khăn được hóa giải. Quá khứ hãy tha thứ, cơ hội mới phải nhanh nắm; xử lý dứt điểm rồi quay về yên.',
 c:'Khó khăn tan biến; xử lý nhanh gọn việc tồn đọng, đừng để lâu.',
 w:'Nợ nần được giải quyết, tài thông; nắm cơ hội nhanh, chớ chần chờ.',
 l:'Hiểu lầm được hóa giải; tha thứ cho nhau, tình lại như xưa.',
 h:'Bệnh dứt dần, giải độc tốt; uống nhiều nước, vận động nhẹ.'},
{n:41,name:'Sơn Trạch Tổn',han:'山澤損',up:6,lo:1,
 t:'Tổn: Hữu phu, nguyên cát, vô cữu, khả trinh, lợi hữu du vãng; hễ dụng? Nhị quỹ khả dụng hưởng.',
 m:'Núi trên đầm, giảm dưới tăng trên — tượng giảm bớt mà thành tựu. Tổn cái tham kiêu của mình, dâng cúng chí thành; hai đĩa mọn cũng đủ lòng thành.',
 c:'Nhẫn chịu thiệt thòi tạm thời; giảm bớt ham muốn, chuyên tâm một việc ắt thành.',
 w:'Tài phải hy sinh bớt để cầu lợi lâu dài; bố thí từ thiện đắc phúc.',
 l:'Nhường nhịn hy sinh vì nhau thì tình sâu; bớt cái tôi, thêm lòng thành.',
 h:'Giảm ăn uống thừa thãi; thanh lọc cơ thể, kiêng khem có lợi.'},
{n:42,name:'Phong Lôi Ích',han:'風雷益',up:4,lo:3,
 t:'Ích: Lợi hữu du vãng, lợi thiệp đại xuyên.',
 m:'Gió sấm tương ích, trên giảm mà dưới được tăng — tượng ích lợi cho dân. Thấy thiện thì theo, có lỗi thì sửa; thời vận tăng trưởng, dấn thân làm việc lớn.',
 c:'Được trên giúp đỡ, tiến thân hanh thông; làm việc ích người ắt thịnh vượng.',
 w:'Tài lợi tăng trưởng mạnh; đầu tư kinh doanh đều sinh lời lớn.',
 l:'Tình được bồi đắp tăng tiến; cho đi không tính toán, nhận lại viên mãn.',
 h:'Sức khỏe tăng cường; tập luyện, bổ sung dinh dưỡng rất hợp thời.'},
{n:43,name:'Trạch Thiên Quái',han:'澤天夬',up:1,lo:0,
 t:'Quái: Dương vu vương đình, phu hiệu hữu lệ; cáo tự ấp, bất lợi tức nhung, lợi hữu du vãng.',
 m:'Đầm dâng lên trời, năm dương quyết trừ một âm — tượng quả quyết dứt khoát. Phơi bày tà ác nơi công đường, dùng đức không dùng võ; quyết đoán mà từ hòa.',
 c:'Quyết đoán loại bỏ kẻ xấu, thói hư; ra quyết định lớn đúng lúc.',
 w:'Dứt khoát cắt lỗ, giải quyết nợ nần; quyết định nhanh có lợi.',
 l:'Phải dứt khoát rõ ràng: chia tay hay gắn bó; lưỡng lự tất hại đôi bên.',
 h:'Quyết định trị dứt điểm bệnh; đừng để bệnh kéo dài dai dẳng.'},
{n:44,name:'Thiên Phong Cấu',han:'天風姤',up:0,lo:4,
 t:'Cấu: Nữ tráng, vật dụng thú nữ.',
 m:'Gió dưới trời, một âm gặp năm dương — tượng ngộ hợp bất ngờ. Duyên xui khiến gặp gỡ, nhưng âm nhu dâng tràn khó giữ; cảnh giác cám dỗ, giữ chính đạo.',
 c:'Gặp cơ hội bất ngờ, quý nhân phùng hội; nhưng coi chừng kẻ nịnh hót.',
 w:'Tài lợi bất ngờ đến; tiền chóng đến chóng đi, đừng ham cả tin.',
 l:'Đào hoa vận động, gặp gỡ tình cờ; đối phương mạnh mẽ, cân nhắc kỹ.',
 h:'Bệnh lạ đột ngột; phòng tránh lây nhiễm, giữ gìn vệ sinh.'},
{n:45,name:'Trạch Địa Tụy',han:'澤地萃',up:1,lo:7,
 t:'Tụy: Hanh; vương cách hữu miếu, lợi kiến đại nhân, hanh, lợi trinh; dụng đại tinh cát.',
 m:'Đầm trên đất, nước tụ về một chỗ — tượng quần anh hội tụ. Tụ họp phải có lễ nghi, nhớ tổ tông kính thánh hiền; tụ mà loạn thì sinh họa.',
 c:'Tập hợp nhân tài, hội họp lớn có lợi; đoàn kết quanh tôn chỉ chính.',
 w:'Tài tụ hợp từ nhiều nguồn; góp vốn hợp tác đông người có lời.',
 l:'Được mọi người quây quần yêu mến; ra mắt họ hàng, cưới hỏi tốt.',
 h:'Chú ý khi tụ tập đông người; phòng bệnh lây, giữ sức đề kháng.'},
{n:46,name:'Địa Phong Thăng',han:'地風升',up:7,lo:4,
 t:'Thăng: Nguyên hanh, dụng kiến đại nhân, vật tuân; nam chinh cát.',
 m:'Cây mọc từ lòng đất vươn lên — tượng thăng tiến dần dần. Nhờ đức nhu thuận mà được nâng đỡ; gặp đại nhân đừng lo, tiến về phương Nam thì cát.',
 c:'Thăng chức đề bạt từng bước vững chắc; gặp người lớn tiến cử, đừng ngại.',
 w:'Tài tích lũy tăng dần như cây lớn; kinh doanh lâu dài phát đạt.',
 l:'Tình lớn dần theo thời gian; chậm mà chắc, kết quả tốt đẹp.',
 h:'Sức khỏe phục hồi từ từ; kiên trì dưỡng sinh, ngày càng tốt.'},
{n:47,name:'Trạch Thủy Khốn',han:'澤水困',up:1,lo:5,
 t:'Khốn: Hanh, trinh, đại nhân cát, vô cữu; hữu ngôn bất tín.',
 m:'Đầm cạn nước, quân tử bị vây khốn — tượng cùng quẫn thử thách chí. Hoạn nạn thử vàng; giữ chí lớn, thành mệnh tùy chí; lời nói lúc này khó ai tin.',
 c:'Bế tắc cùng đường; giữ khí tiết, âm thầm chờ thời, chớ than vãn.',
 w:'Tài cạn kiệt, tiền kẹt cứng; tiết kiệm tối đa, đừng hứa hẹn vay mượn.',
 l:'Tình bị thử thách nghiệt ngã; chân thành vượt qua mới thấy lòng nhau.',
 h:'Sức kiệt, tinh thần mệt mỏi; nghỉ ngơi tuyệt đối, trầm tĩnh tu dưỡng.'},
{n:48,name:'Thủy Phong Tỉnh',han:'水風井',up:5,lo:4,
 t:'Tỉnh: Cải ấp bất cải tỉnh, vô táng vô đắc, vãng lai tỉnh tỉnh.',
 m:'Gàu múc nước giếng, giếng không đổi mà nuôi người vô tận — tượng dưỡng dân không dời. Đức tài như giếng nước; tu sửa giếng cho sạch, phục vụ cộng đồng bền lâu.',
 c:'Giữ vững nghề nghiệp truyền thống; tu đức tích tài, phục vụ người thì vinh.',
 w:'Tài ổn định như nước giếng; nguồn thu đều đặn, tu bổ nghề nghiệp.',
 l:'Tình sâu như giếng, chung thủy bất di; vun đắp đức hạnh bền lâu.',
 h:'Nước uống, thận cần chăm sóc; dưỡng sinh như tu giếng, thường xuyên.'},
{n:49,name:'Trạch Hỏa Cách',han:'澤火革',up:1,lo:2,
 t:'Cách: Tịch nhật nãi phu, nguyên hanh lợi trinh, hối vong.',
 m:'Lửa trong đầm nước, hai nữ chí khác — tượng cách mạng thay đổi. Thời đến phải cải cách triệt để; đợi ngày chín muồi hành sự, được lòng tin thì hối tiếc tan.',
 c:'Cải tổ triệt để cơ cấu cũ; thay đổi đúng thời điểm thì đại thành công.',
 w:'Thay đổi cách làm ăn; đổi mới mô hình kinh doanh, bỏ lối cũ hết hạn.',
 l:'Tình cần thay đổi cách yêu; cũ không hợp phải đổi, đổi rồi tươi mới.',
 h:'Thay đổi lối sống triệt để; bỏ thói quen xấu, tẩy uế thanh lọc.'},
{n:50,name:'Hỏa Phong Đỉnh',han:'火風鼎',up:2,lo:4,
 t:'Đỉnh: Nguyên cát, hanh.',
 m:'Củi theo lửa, đỉnh nấu chín thức ăn — tượng ổn định đổi mới, nấu thực nuôi hiền. Nghe lời nhu thuận mà mắt tai sáng suốt; dùng hiền tài, đổi mới pháp lệnh thì đại cát.',
 c:'Địa vị vững như đỉnh ba chân; dùng người tài, cải cách chế độ ắt hưng.',
 w:'Tài vận đỉnh thịnh; buôn bán ăn uống lợi lớn, đầu tư dài hạn vững vàng.',
 l:'Gia đạo ấm no, bếp lửa sum họp; nấu ăn chăm sóc nhau tình thêm đậm.',
 h:'Ăn chín uống sôi, dinh dưỡng đầy đủ; sức khỏe vững như đỉnh đồng.'},
{n:51,name:'Chấn Vi Lôi',han:'震為雷',up:3,lo:3,
 t:'Chấn: Hanh; chấn lai hách hách, tiếu ngôn nhà nhà; chấn kinh bách lý, bất táng bễ súc.',
 m:'Sấm chồng sấm rung trăm dặm — tượng kinh động mà tu thân tỉnh xét. Sợ hãi mà biết sửa mình thì hóa hung thành cát; giữ vững tâm thần giữa biến động.',
 c:'Biến động lớn chấn kinh; giữ bình tĩnh xử lý, sau sấm trời lại trong.',
 w:'Tài chấn động, thị trường biến; giữ chặt vốn, chớ hoảng loạn bán tháo.',
 l:'Như sét đánh giữa tình yêu; chấn động rồi ổn định, đừng quyết vội.',
 h:'Tim mạch, thần kinh chấn động; tránh sợ hãi quá độ, tĩnh tâm an thần.'},
{n:52,name:'Cấn Vi Sơn',han:'艮為山',up:6,lo:6,
 t:'Cấn: Cấn kỳ bối, bất hoạch kỳ thân; hành kỳ đình, bất kiến kỳ nhân; vô cữu.',
 m:'Núi chồng núi đứng im — tượng dừng đúng chỗ, tĩnh lặng tuyệt đối. Dừng khi cần dừng, động khi cần động đúng thời; thiền định tĩnh tâm, tham niệm tự tiêu.',
 c:'Nên dừng lại suy xét, chớ tiến; tĩnh tâm quán chiếu, chờ thời động.',
 w:'Giữ nguyên tài sản, không động vào; đứng yên lúc này là thắng lợi.',
 l:'Tình cần dừng lại chiêm nghiệm; khoảng lặng giúp thấu hiểu tâm mình.',
 h:'Lưng, cột sống cần tĩnh dưỡng; thiền định, yoga rất hợp.'},
{n:53,name:'Phong Sơn Tiệm',han:'風山漸',up:4,lo:6,
 t:'Tiệm: Nữ quy cát, lợi trinh.',
 m:'Cây mọc trên núi cao, tiệm tiến từng bước — tượng chim nhạn bay về bầy. Việc tiến dần theo thứ tự mới vững; nữ xuất giá đúng lễ thì cát tường.',
 c:'Tiến từng bước chắc chắn, đừng nóng vội; tích lũy dần ắt đến đỉnh cao.',
 w:'Tài tăng dần đều đặn; tiết kiệm đầu tư dài hạn, chắt chiu từng đồng.',
 l:'Tình tiến triển chậm mà bền; theo đúng lễ nghi, cưới hỏi thuận lợi.',
 h:'Dưỡng bệnh từ từ, đừng nóng lành; thuốc bổ dần dần mới thấm.'},
{n:54,name:'Lôi Trạch Quy Muội',han:'雷澤歸妹',up:3,lo:1,
 t:'Quy Muội: Chinh hung, vô du lợi.',
 m:'Sấm động trên đầm, em gái theo chị về chồng — tượng động mà không đúng chính. Tình cảm xô đẩy hành động thiếu suy xét; giữ lễ nghi, chớ vì dục mà quên đạo.',
 c:'Động theo cảm tính dễ hỏng; việc không chính danh thì đừng làm.',
 w:'Đầu tư theo cảm xúc thua lỗ; giao dịch không rõ ràng ắt mang họa.',
 l:'Tình yêu mù quáng, quan hệ bất chính; tỉnh táo giữ mình, chớ sa ngã.',
 h:'Cảm xúc dâng trào hại thân; giữ điều độ, tránh quá khích.'},
{n:55,name:'Lôi Hỏa Phong',han:'雷火豐',up:3,lo:2,
 t:'Phong: Hanh, vương cách chi; vật ưu, nghi nhật trung.',
 m:'Sấm chớp cùng đến, mặt trời giữa trưa rực rỡ — tượng phong đại cực thịnh. Thịnh cực ắt suy, nhật trung tất quy; nhân lúc thịnh làm việc lớn, đừng lo u phiền.',
 c:'Công thành danh toại đỉnh cao; tranh thủ thời thịnh lập nghiệp lớn.',
 w:'Tài lộc cực vượng, thu hoạch bội thu; nhớ tích trữ cho ngày suy.',
 l:'Tình rực rỡ như nắng trưa; hưởng trọn hạnh phúc, đừng lo bóng xế.',
 h:'Sức khỏe sung mãn đỉnh điểm; đừng vui quá độ, giữ nhịp sinh hoạt.'},
{n:56,name:'Hỏa Sơn Lữ',han:'火山旅',up:2,lo:6,
 t:'Lữ: Tiểu hanh, lữ trinh cát.',
 m:'Lửa trên núi cháy qua mau — tượng kẻ lữ hành nơi đất khách. Đi xa nên giữ nhu thuận cẩn trọng, chớ dựa dẫm; lữ mà giữ chính thì nhỏ hanh.',
 c:'Công tác xa, di chuyển nhiều; khiêm tốn cẩn thận nơi xa lạ thì yên.',
 w:'Tài lợi nhỏ nơi xa xứ; buôn bán đi lại, giữ tiền cẩn thận kẻo mất.',
 l:'Tình duyên nơi đất khách, gặp gỡ chốc lát; chớ đặt nặng kỳ vọng.',
 h:'Mệt mỏi vì đi lại; chú ý an toàn đường xá, giữ sức khi xa nhà.'},
{n:57,name:'Tốn Vi Phong',han:'巽為風',up:4,lo:4,
 t:'Tốn: Tiểu hanh, lợi hữu du vãng, lợi kiến đại nhân.',
 m:'Gió chồng gió thấm khắp nơi, nhu thuận mà vô khuy — tượng thuận tình tiến tới. Khiêm nhường thấm sâu vào lòng người; song quá nhu nhược thì khó thành đại sự.',
 c:'Mềm mỏng khéo léo thâm nhập thị trường; nhờ đại nhân dẫn dắt thì thành.',
 w:'Tài lợi nhỏ thấm dần; buôn bán khéo léo, quảng bá từ từ có lời.',
 l:'Dịu dàng thấm vào lòng người; tình êm ái, nhưng cần quyết đoán rõ ràng.',
 h:'Phong tà dễ nhập thể; giữ ấm, tránh gió độc, chú ý gan mật.'},
{n:58,name:'Đoài Vi Trạch',han:'兌為澤',up:1,lo:1,
 t:'Đoài: Hanh, lợi trinh.',
 m:'Hai đầm thông nhau, bạn bè tương hỗ vui vẻ — tượng hoan hỉ thuyết phục. Vui vẻ hòa ái đoàn kết thì hanh; vui mà giữ chính, chớ vui bởi mất nết.',
 c:'Giao tiếp thuyết phục thành công; vui vẻ hòa đồng được lòng mọi người.',
 w:'Tài đến nhờ miệng nói, nghệ thuật; buôn bán dịch vụ đắt khách.',
 l:'Tình vui tươi ngọt ngào; đàm tiếu hỷ thuận, duyên qua lời nói mà kết.',
 h:'Vui vẻ là thuốc bổ; miệng lưỡi, răng hàm cần chú ý chăm sóc.'},
{n:59,name:'Phong Thủy Hoán',han:'風水渙',up:4,lo:5,
 t:'Hoán: Hanh; vương cách hữu miếu, lợi thiệp đại xuyên, lợi trinh.',
 m:'Gió thổi trên nước, tan băng giải tản — tượng ly tán mà tụ về đức lớn. Tán cái tư tâm, tụ lòng người; vượt sóng lớn nhờ đức tin thì hanh thông.',
 c:'Tan rã được thay bằng đoàn kết mới; vượt khó nhờ gắn bó đồng đội.',
 w:'Tài phân tán khó giữ; tập hợp vốn liếng, đừng để tiền rơi rải rác.',
 l:'Tình có nguy cơ tan vỡ; hàn gắn bằng chân tâm, bỏ ngờ vực ghen tuông.',
 h:'Khí huyết tán loạn; tập trung tinh thần, thở sâu điều hòa.'},
{n:60,name:'Thủy Trạch Tiết',han:'水澤節',up:5,lo:1,
 t:'Tiết: Hanh; khổ tiết bất khả trinh.',
 m:'Đầm có bờ nước không tràn — tượng tiết độ chừng mực. Lập chế độ điều độ thì hanh; nhưng khổ tiết quá mức không thể bền, rộng chặt phải đúng lúc.',
 c:'Quản lý chế độ kỷ cương tốt; tiết chế chi phí, sắp xếp việc ngăn nắp.',
 w:'Tiết kiệm chi tiêu đúng mức; ngân sách rõ ràng thì tài bền vững.',
 l:'Tình có chừng mực lễ nghi; yêu mà biết giữ phận thì bền lâu.',
 h:'Ăn uống tiết độ là thuốc hay; kiêng khem đúng độ, sinh hoạt đều đặn.'},
{n:61,name:'Phong Trạch Trung Phu',han:'風澤中孚',up:4,lo:1,
 t:'Trung Phu: Đồn ngư cát, lợi thiệp đại xuyên, lợi trinh.',
 m:'Gió trên đầm, lòng thành ở giữa cảm hóa cả lợn cá — tượng chữ tín tuyệt đối. Lòng thành kính trong sáng cảm động muôn loài; giữ chữ tín vượt biển lớn cũng thành.',
 c:'Chữ tín là vốn quý nhất; thành thật với đối tác, việc lớn ắt thành.',
 w:'Tài dựa trên uy tín; giữ lời hứa tài chính, vay trả đúng hạn phát đạt.',
 l:'Chân thành tin tưởng tuyệt đối; hai lòng trong sáng, nghi kỵ tự tan.',
 h:'Tâm an thì bệnh giảm; giữ lòng trong sáng, tránh lo âu hoài nghi.'},
{n:62,name:'Lôi Sơn Tiểu Quá',han:'雷山小過',up:3,lo:6,
 t:'Tiểu Quá: Hanh, lợi trinh; khả tiểu sự, bất khả đại sự; phi điểu di chi âm, bất nghi thượng, nghi hạ, đại cát.',
 m:'Sấm trên núi vang rồi qua, chim bay để lại tiếng — tượng hơi quá nhỏ. Chỉ nên làm việc nhỏ, tốt xuống không tốt lên; cung kính tiết kiệm quá mức thì cát.',
 c:'Làm việc nhỏ tỉ mỉ tốt; đại sự chưa đến lúc, hạ mình cung kính hơn mức.',
 w:'Tài lợi nhỏ, chắt bóp có lợi; đầu tư lớn lúc này tất thất bại.',
 l:'Quan tâm từng li từng tí được lòng người; đừng đòi hỏi chuyện lớn lao.',
 h:'Chú ý bệnh vặt nhỏ; chữa sớm, khám kỹ, đừng xem thường.'},
{n:63,name:'Thủy Hỏa Ký Tế',han:'水火既濟',up:5,lo:2,
 t:'Ký Tế: Hanh tiểu, lợi trinh; sơ cát chung loạn.',
 m:'Nước trên lửa, nấu chín cơm canh, sáu hào đều đúng vị — tượng đã thành công. Thành công rồi phải lo giữ; đầu cát cuối dễ loạn, phòng họa ngay khi thái bình.',
 c:'Việc đã hoàn thành mỹ mãn; giữ thành quả, phòng ngừa sai sót nhỏ.',
 w:'Tài lợi đã đạt được; hưởng thành quả, đừng tham thêm kẻo loạn.',
 l:'Tình đã viên mãn thành đôi; giữ gìn hạnh phúc, đừng để tình phai.',
 h:'Sức khỏe cân bằng hoàn hảo; duy trì hiện trạng, khám định kỳ phòng bệnh.'},
{n:64,name:'Hỏa Thủy Vị Tế',han:'火水未濟',up:2,lo:5,
 t:'Vị Tế: Hanh; tiểu hồ cật tế, nhu kỳ vĩ, vô du lợi.',
 m:'Lửa trên nước, cáo nhỏ gần qua sông thì ướt đuôi — tượng chưa hoàn thành. Việc gần xong mà hỏng vì thiếu cẩn thận; kiên trì đến cùng, thận trọng từng bước thì hanh.',
 c:'Gần đến đích chớ lơi lỏng; hoàn tất nốt chi tiết cuối mới thành công.',
 w:'Tài gần về tay mà chưa chắc; cẩn thận khâu cuối, chớ vội ăn mừng.',
 l:'Tình chưa rõ ràng, còn thử thách; kiên nhẫn thêm chút nữa sẽ thành.',
 h:'Bệnh chưa dứt hẳn; uống thuốc đến cùng, đừng bỏ dở giữa chừng.'}
];
const BYN={};HX.forEach(function(x){BYN[x.n]=x;});
/* ============ DỮ LIỆU PHỤ ============ */
const POSNAME=['Sơ','Nhị','Tam','Tứ','Ngũ','Thượng'];
const MOVTXT=[
'vị trí khởi đầu — sự việc mới manh nha, động cơ ban đầu quyết định cát hung; chớ vội hành động, giữ gốc cho vững.',
'vị trí trung chính của nội quái — đắc trung đạo, lòng vững vàng; có quý nhân âm thầm tương trợ, an tâm mà tiến.',
'ranh giới giữa nội quái và ngoại quái — vị trí nhiều biến động hiểm nguy; cẩn thận từng bước, kẻo vấp ngã giữa đường.',
'đầu của ngoại quái — vừa bước sang cảnh giới mới, lòng còn do dự lo lắng; thận trọng khiêm tốn thì vượt qua.',
'ngôi quân vị tôn quý — thời cơ chín muồi, nắm quyền chủ động; làm việc lớn đắc thiên thời, quyết đoán ắt thành.',
'đỉnh quẻ sắp thoát ra ngoài — vật cực tất phản, thịnh quá sinh suy; biết dừng đúng lúc, chớ tham tiến thêm.'
];
const SHENG={'Mộc':'Hỏa','Hỏa':'Thổ','Thổ':'Kim','Kim':'Thủy','Thủy':'Mộc'};
const KE={'Mộc':'Thổ','Thổ':'Thủy','Thủy':'Hỏa','Hỏa':'Kim','Kim':'Mộc'};
const HDEL={'Kim':'4 · 9 phương Tây','Mộc':'3 · 8 phương Đông','Thủy':'1 · 6 phương Bắc','Hỏa':'2 · 7 phương Nam','Thổ':'5 · 10 Trung ương'};
const DOMS={tq:'Tổng quan',sn:'Sự nghiệp',tl:'Tài lộc',td:'Tình duyên',sk:'Sức khỏe'};
/* ============ ĐẠI TƯỢNG TRUYỆN (大象傳) 64 QUẺ ============ */
const DT=[
'Thiên hành kiện; quân tử dĩ tự cường bất tức — Trời vận hành cường kiện không ngừng, người quân tử noi theo mà tự cường mãi không thôi.',
'Địa thế khôn; quân tử dĩ hậu đức tái vật — Đất thế nhu thuận, quân tử lấy đức dày mà gánh chở muôn vật.',
'Vân lôi, Truân; quân tử dĩ kinh luân — Mây sấm khí đầu khó khăn, quân tử quay tơ dệt gối cơ mưu.',
'Sơn hạ xuất tuyền, Mông; quân tử dĩ quả hạnh dục đức — Dưới núi dòng suối mới, quân tử quả quyết hành động để nuôi dưỡng đức.',
'Vân thượng ư thiên, Nhu; quân tử dĩ ẩm thực yến lạc — Mây vần trên trởi chờ mưa, quân tử ăn uống yến vui, giữ chí bình thản mà đợi thời.',
'Thiên dữ thủy vi hành, Tụng; quân tử dĩ tác sự mưu thủy — Trời và nước đi ngược chiều, tranh tụng; quân tử làm việc gì cũng mưu tính ngay từ đầu.',
'Địa trung hữu thủy, Sư; quân tử dĩ dung dân súc chúng — Trong đất có nước, quân tử dung nuôi dân, tập hợp quần chúng.',
'Địa thượng hữu thủy, Tỷ; tiên vương dĩ kiến vạn quốc thân chư hầu — Nước trên mặt đất thân mật, vua xưa lập muôn nước, gần gũi chư hầu.',
'Phong hành thiên thượng, Tiểu Súc; quân tử dĩ ý văn đức — Gió chạy trên trởi, quân tử trau dồi vẻ đẹp văn đức.',
'Thượng thiên hạ trạch, Lý; quân tử dĩ biện thượng hạ, định dân chí — Trên trởi dưới đầm, quân tử phân biệt trên dưới, yên ổn chí hướng dân.',
'Thiên địa giao, Thái; hậu dĩ tài thành thiên địa chi đạo, phụ tướng thiên địa chi nghi — Trời đất giao hòa, bậc vương hậu thu xếp thành đạo trởi đất mà phù tá dân.',
'Thiên địa bất giao, Bĩ; quân tử dĩ kiệm đức tị nan, bất khả vinh dĩ lộc — Trời đất không giao, quân tử siết đức tránh họa, không thể lấy lộc làm vinh.',
'Thiên dữ hỏa, Đồng Nhân; quân tử dĩ loại tộc biện vật — Trời cùng lửa đồng minh, quân tử phân loại tộc vật mà phân biệt rõ ràng.',
'Hỏa tại thiên thượng, Đại Hữu; quân tử dĩ át ác dương thiện, thuận thiên hưu mệnh — Lửa sáng trên trởi, quân tử ngăn điều ác, tán dương điều thiện, thuận mệnh tốt đẹp của trởi.',
'Địa trung hữu sơn, Khiêm; quân tử dĩ bầu đa ích quả, xưng vật bình thi — Núi nấp trong đất, quân tử bớt kẻ nhiều thêm người ít, cân xứng mà ban bố bình đẳng.',
'Lôi xuất địa phấn, Dự; tiên vương dĩ tác nhạc sùng đức — Sấm vọng đất phấn khởi, vua xưa làm nhạc để tôn sùng đức lớn.',
'Trạch trung hữu lôi, Tùy; quân tử dĩ hướng hối nhập yến tức — Đầm có sấm ẩn, quân tử lúc chiều tối vào trong nghỉ ngơi dưỡng thần.',
'Sơn hạ hữu phong, Cổ; quân tử dĩ chấn dân dục đức — Dưới núi có gió, quân tử chấn hưng dân tâm, bồi dưỡng đức hạnh.',
'Trạch thượng hữu địa, Lâm; quân tử dĩ giáo tư vô cùng, dung bảo dân vô cương — Đất trên bờ đầm, quân tử dạy dỗ suy nghĩ không cùng, dung bảo dân không bờ.',
'Phong hành địa thượng, Quan; tiên vương dĩ tỉnh phương quan dân thiết giáo — Gió đi khắp trên đất, vua xưa xem xét các phương, nhìn dân mà đặt giáo hóa.',
'Lôi điện, Phệ Hạp; tiên vương dĩ minh phạt sắc pháp — Sấm chớp hợp uy, vua xưa làm sáng tỏ hình phạt, sửa sang pháp luật.',
'Sơn hạ hữu hỏa, Bí; quân tử dĩ minh thứ chính, vô cảm chiết ngục — Dưới núi có lửa, quân tử sáng tỏ việc chính thường, không dám tự ý phán xét ngục tù.',
'Sơn phụ ư địa, Bóc; thượng dĩ hậu hạ an trạch — Núi bám trên đất mòn dần, bậc trên làm dày gốc dưới cho an cư.',
'Lôi tại địa trung, Phục; tiên vương dĩ chí nhật bế quan, thương lữ bất hành — Sấm trong lòng đất, vua xưa ngày đông chí đóng cửa quan, khách buôn ngừng đi lại.',
'Thiên hạ lôi hành, vật dữ Vô Vọng; tiên vương dĩ mậu đối thời dục vạn vật — Sấm đi khắp dưới trởi, vạn vật không vọng động; vua xưa thuận thời mà nuôi dưỡng muôn loài.',
'Thiên tại sơn trung, Đại Súc; quân tử dĩ đa thức tiền ngôn vãng hạnh, dĩ súc kỳ đức — Trời ở trong núi, tích lũy lớn; quân tử ghi nhớ nhiều lời xưa việc cũ để chất chứa đức.',
'Sơn hạ hữu lôi, Di; quân tử dĩ thận ngôn ngữ, tiết ẩm thực — Dưới núi có sấm, quân tử thận trọng lời nói, tiết độ ăn uống.',
'Trạch diệt mộc, Đại Quá; quân tử dĩ độc lập bất cụ, độn thế vô muộn — Đầm nhấn chìm cây, quân tử đứng một mình không sợ, ẩn mình giữa đời mà không buồn.',
'Thủy tiến chí, Tập Khảm; quân tử dĩ thường đức hạnh, tập giáo sự — Nước chảy lớp lớp, quân tử giữ đức hạnh thường xuyên, quen thuộc việc giáo hóa.',
'Minh lưỡng tác, Ly; đại nhân dĩ kế minh chiếu vu tứ phương — Ánh sáng hai lần vụt lên, bậc đại nhân nối ánh sáng mà soi khắp bốn phương.',
'Sơn thượng hữu trạch, Hàm; quân tử dĩ hư thụ nhân — Trên núi có đầm, quân tử lấy lòng hư mà tiếp nhận người.',
'Lôi phong, Hằng; quân tử dĩ lập bất dịch phương — Sấm gió tương tùy, quân tử đứng vững không đổi phương hướng.',
'Thiên hạ hữu sơn, Độn; quân tử dĩ viễn tiểu nhân, bất ác nhi nghiêm — Dưới trởi có núi, quân tử tránh xa kẻ tiểu nhân, không ghét bỏ mà giữ uy nghiêm.',
'Lôi tại thiên thượng, Đại Tráng; quân tử dĩ phi lễ phất lý — Sấm vang trên trởi, quân tử điều phi lễ thì không làm.',
'Minh xuất địa thượng, Tấn; quân tử dĩ tự chiêu minh đức — Ánh sáng mọc trên đất, quân tử tự soi tỏ đức sáng của mình.',
'Minh nhập địa trung, Minh Di; quân tử dĩ lị chúng, dụng hối nhi minh — Ánh sáng lặn vào đất, quân tử ở giữa quần chúng, dùng tối bề ngoài mà sáng bề trong.',
'Phong tự hỏa xuất, Gia Nhân; quân tử dĩ ngôn hữu vật nhi hành hữu hằng — Gió từ lửa sinh ra, quân tử nói có thực chất, làm có thường bền.',
'Thượng hỏa hạ trạch, Khuê; quân tử dĩ đồng nhi dị — Lửa trên đầm dưới, quân tử chung mà vẫn giữ khác biệt.',
'Sơn thượng hữu thủy, Kiển; quân tử dĩ phản thân tu đức — Trên núi có nước ngại, quân tử quay về soi mình mà tu đức.',
'Lôi vũ tác, Giải; quân tử dĩ xá quá hữu tội — Sấm mưa cùng dậy, quân tử tha lỗi, khoan tội cho người.',
'Sơn hạ hữu trạch, Tổn; quân tử dĩ trừng phẫn trất dục — Dưới núi có đầm, quân tử răn cơn giận, chặn lòng tham.',
'Phong lôi, Ích; quân tử dĩ kiến thiện tắc thiên, hữu quá tắc cải — Gió sấm ích trợ nhau, quân tử thấy thiện thì theo, có lỗi thì sửa.',
'Trạch thượng ư thiên, Quải; quân tử dĩ thi lộc cập hạ, cư đức tắc kỵ — Đầm bốc lên trởi, quân tử ban lộc xuống dưới, cố giữ đức riêng thì đáng ghét.',
'Thiên hạ hữu phong, Cấu; hậu dĩ thi mệnh cáo tứ phương — Dưới trởi có gió, bậc vương hậu ban mệnh lệnh răn dạy bốn phương.',
'Trạch thượng ư địa, Tụy; quân tử dĩ trừ nhung khí, giới bất ngu — Đầm trên đất tụ nước, quân tử sửa sang binh khí, đề phòng điều bất ngờ.',
'Địa trung sinh mộc, Thăng; quân tử dĩ thuận đức, tích tiểu dĩ cao đại — Đất sinh cây mọc lên, quân tử thuận đức, tích nhỏ thành cao lớn.',
'Trạch vô thủy, Khốn; quân tử dĩ trí mệnh toại chí — Đầm cạn nước, quân tử dốc cả mệnh mà toại chí hướng.',
'Mộc thượng hữu thủy, Tỉnh; quân tử dĩ lao dân khuyến tướng — Trên gỗ có nước giếng, quân tử lo cho dân, khuyên bảo giúp đỡ lẫn nhau.',
'Trạch trung hữu hỏa, Cách; quân tử dĩ trị lịch minh thời — Đầm có lửa thay da, quân tử làm lịch để sáng tỏ thời tiết.',
'Mộc thượng hữu hỏa, Đỉnh; quân tử dĩ chính vị ngưng mệnh — Trên củi có lửa nấu chín, quân tử chính ngôi vị, ngưng giữ thiên mệnh.',
'Tiến lôi, Chấn; quân tử dĩ khủng cụ tu tỉnh — Sấm chồng sấm, quân tử lấy lòng kính sợ mà tu thân tỉnh xét.',
'Kiêm sơn, Cấn; quân tử dĩ tư bất xuất kỳ vị — Núi chồng núi, quân tử suy nghĩ không vượt khỏi vị trí mình.',
'Sơn thượng hữu mộc, Tiệm; quân tử dĩ cư hiền đức thiện tục — Trên núi có cây lớn dần, quân tử giữ đức hiền, cải thiện phong tục.',
'Trạch thượng hữu lôi, Quy Muội; quân tử dĩ vĩnh chung tri tệ — Đầm có sấm động, quân tử giữ trọn kết cục mà biết chỗ tệ hại.',
'Lôi điện giai chí, Phong; quân tử dĩ chiết ngục trí hình — Sấm chớp cùng đến, quân tử phán đoán ngục tù, thi hành hình phạt.',
'Sơn thượng hữu hỏa, Lữ; quân tử dĩ minh thận dụng hình, nhi bất lưu ngục — Trên núi có lửa, quân tử sáng suốt thận trọng khi dùng hình phạt, không để án tồn đọng.',
'Tùy phong, Tốn; quân tử dĩ thân mệnh hành sự — Gió theo gió, quân tử lặp lại mệnh lệnh mà thi hành công việc.',
'Lệ trạch, Đoài; quân tử dĩ bằng hữu giảng tập — Hai đầm liền nhau, quân tử cùng bạn bè giảng tập đạo lý.',
'Phong hành thủy thượng, Hoán; tiên vương dĩ hưởng vu đế lập miếu — Gió chạy trên mặt nước, vua xưa dâng hưởng thượng đế, lập miếu thờ.',
'Trạch thượng hữu thủy, Tiết; quân tử dĩ chế số độ, nghị đức hạnh — Đầm chứa nước vừa mực, quân tử đặt số lượng phép tắc, bàn luận đức hạnh.',
'Trạch thượng hữu phong, Trung Phu; quân tử dĩ nghị ngục hoãn tử — Gió trên mặt đầm, quân tử xét ngục tù kỹ lưỡng, khoan hồng với án tử.',
'Sơn thượng hữu lôi, Tiểu Quá; quân tử dĩ hành quá hồ cung, tang quá hồ ai, dụng quá hồ kiệm — Trên núi có sấm, quân tử hành sự hơi quá cung kính, tang hơi quá ai thương, dùng hơi quá tiết kiệm.',
'Thủy tại hỏa thượng, Ký Tế; quân tử dĩ tư hoạn nhi dự phòng chi — Nước trên lửa, đã vượt xong, quân tử nghĩ đến họa mà phòng trước.',
'Hỏa tại thủy thượng, Vị Tế; quân tử dĩ thận biện vật cư phương — Lửa trên nước, chưa vượt xong, quân tử thận trọng phân biệt vạn vật, đặt đúng phương vị.'
];
/* ============ DỮ LIỆU MAI HOA · QUỶ CỐC · KHOA HỌC ============ */
const CHINAME=['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];
const METHODS={coins:'3 Đồng Xu',maihoa:'Mai Hoa Dịch Số',quycoc:'Quỷ Cốc Thần Số'};
const BTNLBL={coins:'GIEO QUẺ',maihoa:'KHỞI QUẺ MAI HOA',quycoc:'KHỞI THỨC QUỶ CỐC'};
const FIB=[1,2,3,5,8,13,21,34,55,89];
const RELTXT={
 ty:'Thượng hạ đồng hành, khí vận tỷ hòa: thiên địa một lòng, muôn lực cùng hướng; thời cơ chín muồi, chỉ cần điều tiết cho khỏi quá cực.',
 us:'Thượng quái sinh hạ quái: ngoại cảnh nâng đỡ nội tâm, bề trên phù trợ kẻ dưới; thời vận hanh thông, có quý nhân dìu dắt.',
 ls:'Hạ quái sinh thượng quái: tự thân dốc sức ứng thời, trong vang ngoài ứng; công sức bỏ ra không uổng, được bề trên thu nạp trọng dụng.',
 uk:'Thượng quái khắc hạ quái: ngoại cảnh áp đảo, áp lực từ trên xuống; thời vận còn trắc trở, nên ẩn nhẫn thuận thế, tích lực chờ cơ.',
 lk:'Hạ quái khắc thượng quái: nội tình chống ngoại cảnh, dễ sinh ma sát với bề trên, hoàn cảnh; dùng nhu hòa mà hóa giải, chớ cứng đối cứng.'
};
const RELSC={ty:.85,us:.9,ls:.7,uk:.35,lk:.45};
const TDREL={
 ds:{w:'Đại Cát',s:1,t:'<b>Dụng sinh Thể</b> — ngoại cảnh, sự việc, người khác chủ động đến giúp mình; không phí sức mà thành, cát lợi rõ rệt.'},
 ty:{w:'Thuận · Tỷ Hòa',s:.85,t:'<b>Thể Dụng tỷ hòa</b> — đồng khí tương cầu, mình và hoàn cảnh một lòng; mưu sự dễ thành, được bạn bè đồng nghiệp tương trợ.'},
 tk:{w:'Tiểu Cát',s:.7,t:'<b>Thể khắc Dụng</b> — mình chế ngự được sự việc; thành công nhưng phải bỏ công sức, chủ động nắm chặt thì được.'},
 ts:{w:'Tiểu Hung · Hao Tổn',s:.45,t:'<b>Thể sinh Dụng</b> — bản thân tiết khí nuôi sự việc; hao tài, tổn lực, cho đi nhiều hơn nhận lại; giữ gìn tinh lực, chớ ôm đồm.'},
 dk:{w:'Đại Hung',s:.2,t:'<b>Dụng khắc Thể</b> — sự việc, ngoại cảnh chế ngự bản thân; đại hung, nên dừng lại, lui giữ gốc, chờ thời khác.'}
};
const QCT=[
'thiên thời cương thịnh, vận hội đương đầu như cửu thiên ngự phong',
'thiên thời hòa duyệt, cơ duyên mở ra nơi miệng lưỡi giao thiệp',
'thiên thời quang minh, văn sắc danh tiếng được soi tỏ khắp nơi',
'thiên thời chấn động, biến cơ khởi phát bất ngờ, động mà hữu thanh',
'thiên thời ôn hòa, phong vận thẩm thấu, tiến êm mà vào sâu',
'thiên thời hiểm phục, vận trình uẩn khúc, phải giữ chí mới xuyên qua',
'thiên thời tĩnh chỉ, vạn sự tạm ngưng để dưỡng lực tích đức',
'thiên thời nhu thuận, đại địa bao dung, thuận theo thì đắc lực'];
const QCD=[
'địa lợi cao quý, thế đất vững như trởi che, quý nhân nâng đỡ',
'địa lợi hỉ duyệt, ao hồ hội tụ, tài khí quy về nơi giao hảo',
'địa lợi sáng rực, danh vị dễ bày, hợp việc công khai rộng rãi',
'địa lợi khởi động, đất trồi mầm mống, lợi khai sơn phá thế',
'địa lợi nhuần nhuyễn, mọi đường đều thông, lợi mưu dài lâu',
'địa lợi nhiều chướng, đường đi nước bước gập ghềnh, phải dò dẫm',
'địa lợi an cư, sơn thế yên vững, lợi giữ gìn hơn khai phá',
'địa lợi dung nạp, đất rộng chở vạn vật, lợi kết hợp quần lực'];
const QCN=[
'nhân hòa cương chính, được người tài đức giúp sức, quyết đoán mà thành',
'nhân hòa vui vẻ, lời nói thuận tai, mọi người đều vui giúp đỡ',
'nhân hòa sáng suốt, tri kỷ soi đường, hợp mưu cùng kẻ hiền trí',
'nhân hòa dũng mãnh, đồng đội nhiệt huyết, việc khởi đầu có người xung phong',
'nhân hòa khiêm tốn, được lòng kẻ dưới, âm thầm mà thành việc',
'nhân hòa thử thách, lòng người chưa rõ, phải thành tín mới giữ được nhau',
'nhân hòa trầm ổn, bạn bè ít mà chắc, chậm rãi mới thấy lòng thật',
'nhân hòa thuần hậu, mọi người một lòng, lấy đức mà quy tụ nhân tài'];
const KET=[
'Địch khí như lạc, tự tâm như cầm — quẻ chỉ vẽ đường, bước đi do chân mình; thuận thì khiêm cung giữ lấy, nghịch thì tĩnh tâm tu đức, ắt vượt qua.',
'Quân tử được thời thì giương buồm, mất thời thì bồi đắp gốc rễ; cát hung vốn do nhân sự tạo nên, quẻ tượng chỉ là tấm gương để soi lòng.',
'Đức năng thắng số: người tu thân tích thiện, gặp hung cũng hóa cát; kẻ buông lòng tham ác, gặp cát rồi cũng tàn. Lấy đức làm gốc, lấy quẻ làm tham khảo.',
'Thuận thiên giả tồn, nghịch thiên giả vong — thuận ở đây là thuận theo lẽ phải, theo thời cơ; giữ lòng trung chính, việc gì cũng dần vào quỹ đạo.',
'Vạn sự khởi ở tâm, thành ở hành, bền ở đức; quẻ này soi sáng thế cục, còn quyết định cuối cùng luôn nằm trong tay người quân tử.',
'Trời không nói mà bốn mùa chạy, đất không nói mà vạn vật sinh; người biết an phận thủ thường, thuận thời ứng biến, tự nhiên cát khánh tùy thân.'
];
/*==LOGIC==*/
/* ============ TIỆN ÍCH ============ */
function $(id){return document.getElementById(id);}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function glyph(n){return String.fromCodePoint(0x4DC0+n-1);}
function store(k,v){try{localStorage.setItem(k,v);}catch(e){}}
function read(k){try{return localStorage.getItem(k);}catch(e){return null;}}
/* ============ SAO BĂNG NỀN ============ */
(function stars(){
 var box=$('stars'),n=72,h='';
 for(var i=0;i<n;i++){
  var x=Math.random()*100,y=Math.random()*100,s=(Math.random()*2+1).toFixed(1);
  var d=(Math.random()*3+2.2).toFixed(2),dl=(Math.random()*4).toFixed(2);
  h+='<span class="star" style="left:'+x+'%;top:'+y+'%;width:'+s+'px;height:'+s+'px;--d:'+d+'s;--dl:'+dl+'s"></span>';
 }
 box.innerHTML=h;
})();
/* ============ VÒNG BÁT QUÁI ============ */
(function orbit(){
 var o=$('orbit'),h='';
 for(var i=0;i<8;i++){
  h+='<span style="--a:'+(i*45)+'deg">'+TRI[i].sym+'</span>';
 }
 o.innerHTML=h;
})();
/* ============ HÀ ĐỒ & LẠC THƯ (SVG) ============ */
function dots(cx,cy,count,white,perRow){
 var r=4.6,gap=11,rows=Math.ceil(count/perRow),s='';
 for(var i=0;i<count;i++){
  var row=Math.floor(i/perRow),col=i%perRow;
  var cols=Math.min(perRow,count-row*perRow);
  var x=cx+(col-(cols-1)/2)*gap,y=cy+(row-(rows-1)/2)*gap;
  s+='<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+r+'" fill="'+(white?'#f2e6c4':'#171026')+'"'+(white?'':' stroke="#d4af37" stroke-width="0.8"')+'/>';
 }
 return s;
}
function lbl(x,y,t,anchor){
 return '<text x="'+x+'" y="'+y+'" text-anchor="'+(anchor||'middle')+'" font-size="11.5" fill="#d4af37" font-family="Georgia,serif" letter-spacing="1">'+t+'</text>';
}
(function haDo(){
 var s='<rect x="1" y="1" width="318" height="318" rx="14" fill="rgba(10,6,22,.5)" stroke="rgba(212,175,55,.4)"/>';
 s+='<circle cx="160" cy="160" r="150" fill="none" stroke="rgba(212,175,55,.18)"/>';
 s+='<circle cx="160" cy="160" r="62" fill="none" stroke="rgba(212,175,55,.25)" stroke-dasharray="3 5"/>';
 /* Nam (trên): 7 trắng + 2 đen — Hỏa */
 s+=dots(160,40,7,true,5)+dots(160,76,2,false,2)+lbl(160,108,'2 · 7 — Nam · Hỏa');
 /* Bắc (dưới): 1 trắng + 6 đen — Thủy */
 s+=dots(160,280,1,true,1)+dots(160,244,6,false,3)+lbl(160,214,'1 · 6 — Bắc · Thủy');
 /* Đông (trái): 3 trắng + 8 đen — Mộc */
 s+=dots(36,160,3,true,3)+dots(80,160,8,false,4)+lbl(66,196,'3 · 8 — Đông · Mộc');
 /* Tây (phải): 4 đen + 9 trắng — Kim */
 s+=dots(240,160,4,false,2)+dots(288,160,9,true,5)+lbl(254,196,'4 · 9 — Tây · Kim');
 /* Trung: 5 trắng + 10 đen — Thổ */
 s+=dots(160,143,5,true,5)+dots(160,180,10,false,5)+lbl(160,122,'5 · 10 — Trung · Thổ');
 $('hdSvg').innerHTML=s;
})();
(function lacThu(){
 var vals=[[4,9,2],[3,5,7],[8,1,6]];
 var cung={'1':'Khảm Bắc','2':'Khôn Tây Nam','3':'Chấn Đông','4':'Tốn Đông Nam','5':'Trung Cung','6':'Càn Tây Bắc','7':'Đoài Tây','8':'Cấn Đông Bắc','9':'Ly Nam'};
 var s='<rect x="1" y="1" width="318" height="318" rx="14" fill="rgba(10,6,22,.5)" stroke="rgba(212,175,55,.4)"/>';
 for(var r=0;r<3;r++){
  for(var c=0;c<3;c++){
   var v=vals[r][c],x=10+c*100,y=10+r*100,cx=x+50,cy=y+44;
   s+='<rect x="'+x+'" y="'+y+'" width="100" height="100" rx="10" fill="rgba(212,175,55,.05)" stroke="rgba(212,175,55,.35)"/>';
   s+=dots(cx,cy,v,v%2===1,Math.min(v,5));
   s+='<text x="'+(x+10)+'" y="'+(y+20)+'" font-size="12" fill="#f2dc8d" font-family="Georgia,serif">'+v+'</text>';
   s+='<text x="'+cx+'" y="'+(y+90)+'" text-anchor="middle" font-size="10" fill="#b9a98a" font-family="Georgia,serif">'+cung[String(v)]+'</text>';
  }
 }
 $('ltSvg').innerHTML=s;
})();
/* ============ CHUYỂN TAB ============ */
(function tabs(){
 var btns=document.querySelectorAll('#tabs .tab');
 btns.forEach(function(b){
  b.addEventListener('click',function(){
   btns.forEach(function(x){x.classList.remove('on');});
   b.classList.add('on');
   document.querySelectorAll('.screen').forEach(function(s){s.classList.remove('active');});
   $(b.dataset.s).classList.add('active');
   window.scrollTo(0,0);
   if(b.dataset.s==='scr-his')renderHis();
  });
 });
})();
/* ============ CHỌN LĨNH VỰC ============ */
var curDom='tq';
(function pills(){
 var ps=document.querySelectorAll('#domPills .pill');
 ps.forEach(function(p){
  p.addEventListener('click',function(){
   ps.forEach(function(x){x.classList.remove('on');});
   p.classList.add('on');curDom=p.dataset.d;
  });
 });
})();
/* ============ VẼ QUẺ ============ */
function hexHTML(yang,mv){
 var h='<div class="hex">';
 for(var i=5;i>=0;i--){
  h+='<div class="yao'+(mv&&mv[i]?' mv':'')+'" style="animation-delay:'+((5-i)*0.08)+'s"><div class="bars">'
   +(yang[i]?'<span class="b full"></span>':'<span class="b half"></span><span class="b half"></span>')
   +'</div><span class="mk">'+(mv&&mv[i]?(yang[i]?'○':'✕'):'')+'</span></div>';
 }
 return h+'</div>';
}
function yangFromTri(up,lo){
 var s=TRI[lo].bin+TRI[up].bin,arr=[];
 for(var i=0;i<6;i++)arr.push(s.charAt(i)==='1');
 return arr;
}
function numFromYang(yang){
 var bin=yang.map(function(y){return y?'1':'0';}).join('');
 var up=TBYBIN[bin.slice(3)],lo=TBYBIN[bin.slice(0,3)];
 return {up:up,lo:lo,num:HEXMAT[up][lo]};
}
/* ============ PHÂN TÍCH HÀ ĐỒ · LẠC THƯ ============ */
function elemAnalysis(up,lo){
 var U=TRI[up],L=TRI[lo],rel;
 if(U.el===L.el)rel='ty';
 else if(SHENG[U.el]===L.el)rel='us';
 else if(SHENG[L.el]===U.el)rel='ls';
 else if(KE[U.el]===L.el)rel='uk';
 else rel='lk';
 var t='Thượng quái <b>'+U.sym+' '+U.name+'</b> thuộc hành <b>'+U.el+'</b> (Hà Đồ: '+HDEL[U.el]+'); hạ quái <b>'+L.sym+' '+L.name+'</b> thuộc hành <b>'+L.el+'</b> (Hà Đồ: '+HDEL[L.el]+'). ';
 if(rel==='ty')t+='Hai quái đồng hành '+U.el+', khí tỷ hòa mà vượng, sự việc được sức mạnh cộng hưởng; nhưng quá thịnh dễ sinh cực đoan, phải biết điều tiết. ';
 else if(rel==='us')t+='Hành '+U.el+' của thượng quái <b>sinh</b> hành '+L.el+' của hạ quái — trên sinh dưới, ngoại cảnh nuôi dưỡng nội tâm, mưu sự được trời đất tương trợ, đại cát. ';
 else if(rel==='ls')t+='Hành '+L.el+' của hạ quái <b>sinh</b> hành '+U.el+' của thượng quái — dưới sinh trên, nội tâm tuân theo ngoại cảnh, xuất lực mà thành công, được bề trên thu nạp. ';
 else if(rel==='uk')t+='Hành '+U.el+' của thượng quái <b>khắc</b> hành '+L.el+' của hạ quái — trên chế ngự dưới, ngoại cảnh áp đảo nội tâm; phải thuận thế điều hòa mới khỏi tổn hại. ';
 else t+='Hành '+L.el+' của hạ quái <b>khắc</b> hành '+U.el+' của thượng quái — dưới phạm trên, nội tâm chống ngoại cảnh, dễ sinh xung đột; cần nhu hòa để hóa giải. ';
 t+='Theo Lạc Thư: '+U.name+' ứng cung số '+U.lt+' phương '+U.dir+', '+L.name+' ứng cung số '+L.lt+' phương '+L.dir+'; hai cung tương hội thành tượng quẻ, cát hung định theo sinh khắc của phương vị.';
 return t;
}
/* ============ CHI TIẾT QUẺ ============ */
function triInfo(x){
 var U=TRI[x.up],L=TRI[x.lo];
 return 'Thượng: '+U.sym+' '+U.name+' ('+U.nat+' · '+U.el+') — Hạ: '+L.sym+' '+L.name+' ('+L.nat+' · '+L.el+')';
}
function detailHTML(x){
 return '<div class="res-head"><div class="res-glyph">'+glyph(x.n)+'</div>'
 +'<div class="res-name">'+x.n+'. '+esc(x.name)+'</div>'
 +'<div class="res-han">'+x.han+'</div>'
 +'<div class="res-tri">'+triInfo(x)+'</div></div>'
 +'<div class="hr"></div>'
 +hexHTML(yangFromTri(x.up,x.lo),null)
 +'<h3>Đại Tượng Truyện</h3><blockquote>'+DT[x.n]+'</blockquote>'
 +'<h3>Thoán Từ</h3><blockquote>'+esc(x.t)+'</blockquote>'
 +'<h3>Ý Nghĩa Luận Giải</h3><p>'+esc(x.m)+'</p>'
 +'<h3>Luận Theo Bốn Lĩnh Vực</h3>'
 +'<p><span class="tag">Sự nghiệp</span>'+esc(x.c)+'</p>'
 +'<p style="margin-top:7px"><span class="tag">Tài lộc</span>'+esc(x.w)+'</p>'
 +'<p style="margin-top:7px"><span class="tag">Tình duyên</span>'+esc(x.l)+'</p>'
 +'<p style="margin-top:7px"><span class="tag">Sức khỏe</span>'+esc(x.h)+'</p>'
 +'<h3>Phân Tích Hà Đồ · Lạc Thư</h3><p>'+elemAnalysis(x.up,x.lo)+'</p>';
}
/* ============ MODAL ============ */
function openModal(html){$('mBody').innerHTML=html;$('modal').classList.add('open');$('modal').querySelector('.sheet').scrollTop=0;}
function closeModal(){$('modal').classList.remove('open');}
$('mBack').addEventListener('click',closeModal);
$('mClose').addEventListener('click',closeModal);
/* ============ DANH SÁCH 64 QUẺ ============ */
function norm(s){return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/đ/g,'d');}
function renderList(){
 var kw=norm(($('search').value||'').trim()),h='';
 HX.forEach(function(x){
  var key=norm(x.n+'. '+x.name);
  if(kw&&key.indexOf(kw)<0)return;
  h+='<div class="hex-item" data-n="'+x.n+'"><span class="gl">'+glyph(x.n)+'</span>'
   +'<span class="nm"><b>'+x.n+'. '+esc(x.name)+' '+x.han+'</b><span>'+triInfo(x)+'</span></span>'
   +'<span class="no">'+x.n+'</span></div>';
 });
 $('hexList').innerHTML=h||'<div class="empty">Không tìm thấy quẻ phù hợp.</div>';
 $('hexList').querySelectorAll('.hex-item').forEach(function(it){
  it.addEventListener('click',function(){openModal(detailHTML(BYN[+it.dataset.n]));});
 });
}
$('search').addEventListener('input',renderList);
renderList();
/* ============ TIỆN ÍCH SỐ HỌC DỊCH ============ */
function modK(k,base){var r=k%base;return r===0?base:r;}
function hourChiNum(h){return Math.floor(((h+1)%24)/2)+1;}
function approxLunar(d){
 var ref=Date.UTC(2024,1,10),SYN=29.530588853;
 var days=Math.floor((Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())-ref)/86400000);
 var mf=days/SYN,ms=Math.floor(mf);
 var day=Math.floor((mf-ms)*SYN)+1;
 if(day>30)day=30;
 var year=2024+Math.floor(ms/12);
 var month=((ms%12)+12)%12+1;
 var yc=((year-4)%12+12)%12+1;
 return {y:year,m:month,d:day,yc:yc};
}
function valsFromYM(yang,mv){return yang.map(function(y,i){return y?(mv[i]?9:7):(mv[i]?6:8);});}
function castFromULD(up,lo,dong){
 var yang=yangFromTri(up,lo),mv=[false,false,false,false,false,false];
 mv[dong-1]=true;
 return {vals:valsFromYM(yang,mv),yang:yang,mv:mv};
}
function nuclear(yang){
 var loB=(yang[1]?'1':'0')+(yang[2]?'1':'0')+(yang[3]?'1':'0');
 var upB=(yang[2]?'1':'0')+(yang[3]?'1':'0')+(yang[4]?'1':'0');
 var up=TBYBIN[upB],lo=TBYBIN[loB];
 return {up:up,lo:lo,num:HEXMAT[up][lo]};
}
function theDung(up,lo,mv){
 var idx=[];for(var i=0;i<6;i++)if(mv[i])idx.push(i);
 if(idx.length!==1)return null;
 var p=idx[0],dl=p<3;
 return {pos:p,dung:dl?lo:up,the:dl?up:lo,dungLo:dl};
}
function tdRel(theEl,dungEl){
 if(theEl===dungEl)return 'ty';
 if(SHENG[dungEl]===theEl)return 'ds';
 if(KE[dungEl]===theEl)return 'dk';
 if(SHENG[theEl]===dungEl)return 'ts';
 return 'tk';
}
function upLoRel(up,lo){
 var U=TRI[up],L=TRI[lo];
 if(U.el===L.el)return 'ty';
 if(SHENG[U.el]===L.el)return 'us';
 if(SHENG[L.el]===U.el)return 'ls';
 if(KE[U.el]===L.el)return 'uk';
 return 'lk';
}
function shannon(yang){
 var y=0,i;for(i=0;i<6;i++)if(yang[i])y++;
 var p=y/6;
 if(p===0||p===1)return {H:0,y:y};
 return {H:-(p*Math.log2(p)+(1-p)*Math.log2(1-p)),y:y};
}
function fibAround(n){
 var lo=FIB[0],hi=FIB[FIB.length-1],i;
 for(i=0;i<FIB.length;i++){if(FIB[i]<=n)lo=FIB[i];}
 for(i=FIB.length-1;i>=0;i--){if(FIB[i]>=n){hi=FIB[i];break;}}
 return {lo:lo,hi:hi};
}
function haDoScore(yang,binfo){
 var cnt={'Kim':0,'Mộc':0,'Thủy':0,'Hỏa':0,'Thổ':0};
 function add(ti,w){cnt[TRI[ti].el]+=w;}
 var b=numFromYang(yang),nu=nuclear(yang);
 add(b.up,2);add(b.lo,2);add(nu.up,1);add(nu.lo,1);
 if(binfo){add(binfo.up,1);add(binfo.lo,1);}
 var tot=0,k;for(k in cnt)tot+=cnt[k];
 var H=0;
 for(k in cnt){if(cnt[k]>0){var pp=cnt[k]/tot;H-=pp*Math.log2(pp);}}
 return {cnt:cnt,bal:H/Math.log2(5)};
}
var TOKSTOP=['cỦA'.toLowerCase(),'và','là','có','được','cho','với','một','những','các','trong','không','tôi','mình','này','đó','thì','mà','ở','về','việc','đi','đến','ra','vào','trên','dưới','sẽ','đã','đang','rất','bao','nhiêu','khi','nào','hay','làm','sao','gì','ai','người','nên','muốn','cần','biết','theo','từ','bị','như','thế','năm','tháng','ngày','hơn','còn','lại','cũng','đây','kia','ấy','vậy','vẫn','mới','chỉ','rồi','đâu','ạ','họ','em','anh','chị'];
function toks(s){
 var t=norm(s).split(/[^a-z0-9]+/),o=[],i;
 for(i=0;i<t.length;i++){if(t[i]&&TOKSTOP.indexOf(t[i])<0)o.push(t[i]);}
 return o;
}
function domainFit(q,x,dom){
 if(!q)return .55;
 var qt=toks(q);if(!qt.length)return .55;
 var dt=toks(x.m+' '+x.c+' '+x.w+' '+x.l+' '+x.h);
 var ov=0,i;
 for(i=0;i<qt.length;i++)if(dt.indexOf(qt[i])>=0)ov++;
 var ratio=Math.min(1,ov/Math.max(2,Math.min(6,Math.ceil(qt.length/2))));
 return .35+.65*ratio;
}
function bayes(fit){
 var p0=1/64,LR=1+9*fit;
 return {p0:p0,p1:LR*p0/(LR*p0+1-p0),LR:LR};
}
function qcVerdict(rel,dong){
 var base=RELSC[rel],pos=[.55,.9,.45,.6,.95,.5][dong-1];
 var s=(base+pos)/2;
 if(s>=.8)return 'Thiên thời chí, địa lợi túc, nhân hòa đầy — tam tài tương đắc, mưu sự khả thành; cứ quyết tâm mà tiến, trời đất cùng tương trợ.';
 if(s>=.65)return 'Tam tài tương hòa mà chưa viên mãn — việc có thể thành, song phải chọn đúng thời cơ, nhờ thêm nhân lực phù giúp mới trọn vẹn.';
 if(s>=.5)return 'Thiên địa có phần tương trở, nhân hòa còn thiếu — mưu sự nửa được nửa mất; nên hoãn mà cầu nhân duyên, chớ nóng vội.';
 return 'Thiên thời vị chí, địa lợi bất túc, nhân hòa tương phạm — tam tài tương khắc; việc lớn nên dừng, giữ gốc tu đức để chờ thời vận chuyển.';
}
function hMini(yang,mv){
 var h='<div class="hmini">';
 for(var i=5;i>=0;i--)h+='<div class="row2'+(mv&&mv[i]?' mv2':'')+'">'+(yang[i]?'<i class="wf"></i>':'<i class="wh"></i><i class="wh"></i>')+'</div>';
 return h+'</div>';
}
function castHexHTML(yang,mv){
 var h='';
 for(var i=0;i<6;i++){
  h+='<div class="yao'+(mv[i]?' mv':'')+'" style="animation-delay:'+(i*0.12)+'s"><div class="bars">'
   +(yang[i]?'<span class="b full"></span>':'<span class="b half"></span><span class="b half"></span>')
   +'</div><span class="mk">'+(mv[i]?(yang[i]?'○':'✕'):'')+'</span></div>';
 }
 return h;
}
function pct(p){return (p*100).toFixed(p<0.01?2:1)+'%';}
/* ============ CHỌN PHƯƠNG PHÁP ============ */
var curM='coins',mhMode='time',qcMode='rand';
(function methodSeg(){
 var opts=document.querySelectorAll('#methodSeg .sopt');
 opts.forEach(function(o){
  o.addEventListener('click',function(){
   opts.forEach(function(x){x.classList.remove('on');});
   o.classList.add('on');curM=o.dataset.m;
   ['coins','maihoa','quycoc'].forEach(function(m){var el=$('mp-'+m);if(el)el.style.display=(m===curM?'block':'none');});
   $('btnCast').textContent=BTNLBL[curM];
  });
 });
})();
(function subSel(){
 function wire(boxId,attr,cb){
  var ps=document.querySelectorAll('#'+boxId+' .pill');
  ps.forEach(function(p){
   p.addEventListener('click',function(){
    ps.forEach(function(x){x.classList.remove('on');});
    p.classList.add('on');cb(p.dataset[attr]);
   });
  });
 }
 wire('mhPills','mh',function(v){
  mhMode=v;
  $('mh-time').style.display=v==='time'?'block':'none';
  $('mh-num').style.display=v==='num'?'block':'none';
  $('mh-text').style.display=v==='text'?'block':'none';
 });
 wire('qcPills','qc',function(v){
  qcMode=v;
  $('qc-num').style.display=v==='num'?'block':'none';
 });
})();
(function prefillMH(){
 var now=new Date(),L=approxLunar(now),hc=hourChiNum(now.getHours());
 $('mhYC').value=L.yc;$('mhLM').value=L.m;$('mhLD').value=L.d;$('mhHC').value=hc;
 $('mhTimeNote').innerHTML='Quy đổi xấp xỉ từ giờ dương hiện tại: <b>ngày '+L.d+' tháng '+L.m+' năm '+CHINAME[L.yc-1]+'</b> (âm lịch), giờ <b>'+CHINAME[hc-1]+'</b> ('+hc+').';
})();
/* ============ THU THẬP ĐẦU VÀO & KHỞI QUẺ ============ */
function clampNum(v,min,max,msg){
 var n=parseInt(v,10);
 if(isNaN(n)||n<min||n>max){alert(msg);return null;}
 return n;
}
function gatherCast(){
 var q=$('q').value.trim(),dom=curDom;
 if(curM==='coins')return {m:'coins',vals:null,q:q,dom:dom,meta:{}};
 var upN,loN,dong,meta={};
 if(curM==='maihoa'){
  meta.kind=mhMode;
  if(mhMode==='time'){
   var yc=clampNum($('mhYC').value,1,12,'Vui lòng nhập chi của năm (số 1–12).');if(yc===null)return null;
   var lm=clampNum($('mhLM').value,1,12,'Vui lòng nhập tháng âm lịch (1–12).');if(lm===null)return null;
   var ld=clampNum($('mhLD').value,1,30,'Vui lòng nhập ngày âm lịch (1–30).');if(ld===null)return null;
   var hc=clampNum($('mhHC').value,1,12,'Vui lòng nhập chi của giờ (1–12).');if(hc===null)return null;
   var A=yc+lm+ld,B=A+hc;
   upN=modK(A,8);loN=modK(B,8);dong=modK(B,6);
   meta.yc=yc;meta.lm=lm;meta.ld=ld;meta.hc=hc;
   meta.recap='Thởi gian âm lịch: năm '+CHINAME[yc-1]+' ('+yc+'), tháng '+lm+', ngày '+ld+', giờ '+CHINAME[hc-1]+' ('+hc+'). Thượng quái: ('+yc+'+'+lm+'+'+ld+') = '+A+', '+A+' mod 8 = '+upN+' → '+TRI[upN-1].name+'. Hạ quái: '+A+' + '+hc+' = '+B+', '+B+' mod 8 = '+loN+' → '+TRI[loN-1].name+'. Hào động: '+B+' mod 6 = '+dong+' → hào '+POSNAME[dong-1]+'.';
  }else if(mhMode==='num'){
   var a=clampNum($('mhN1').value,1,999999999,'Vui lòng nhập số thứ nhất (≥ 1).');if(a===null)return null;
   var b=clampNum($('mhN2').value,1,999999999,'Vui lòng nhập số thứ hai (≥ 1).');if(b===null)return null;
   var c=clampNum($('mhN3').value,1,999999999,'Vui lòng nhập số thứ ba (≥ 1).');if(c===null)return null;
   upN=modK(a,8);loN=modK(b,8);dong=modK(a+b+c,6);
   meta.a=a;meta.b=b;meta.c=c;
   meta.recap='Ba số '+a+', '+b+', '+c+': '+a+' mod 8 = '+upN+' → thượng '+TRI[upN-1].name+'; '+b+' mod 8 = '+loN+' → hạ '+TRI[loN-1].name+'; tổng '+(a+b+c)+' mod 6 = '+dong+' → hào '+POSNAME[dong-1]+' động.';
  }else{
   var str=$('mhStr').value.trim();
   var chars=str.replace(/\s+/g,'').replace(/[.,;:!?"'“”‘’()\-–—…\/\\|@#$%^&*+=<>{}\[\]~`]/g,'');
   var n=Array.from(chars).length;
   if(n<2){alert('Vui lòng nhập một câu hoặc cụm chữ có ít nhất 2 chữ cái.');return null;}
   var h1=Math.ceil(n/2),h2=n-h1;
   upN=modK(h1,8);loN=modK(h2,8);dong=modK(n,6);
   meta.txt=str.slice(0,40);
   meta.recap='Câu "'+str+'" đếm được '+n+' chữ: nửa đầu '+h1+' chữ mod 8 = '+upN+' → thượng '+TRI[upN-1].name+'; nửa sau '+h2+' chữ mod 8 = '+loN+' → hạ '+TRI[loN-1].name+'; tổng '+n+' mod 6 = '+dong+' → hào '+POSNAME[dong-1]+' động.';
  }
 }else{
  meta.mode=qcMode;
  if(qcMode==='xu')return {m:'quycoc',vals:null,q:q,dom:dom,meta:{mode:'xu',thuc:[]}};
  var t,d,nn;
  if(qcMode==='rand'){
   t=1+Math.floor(Math.random()*100);d=1+Math.floor(Math.random()*100);nn=1+Math.floor(Math.random()*100);
  }else{
   t=clampNum($('qcN1').value,1,100,'Vui lòng nhập Thiên thức (1–100).');if(t===null)return null;
   d=clampNum($('qcN2').value,1,100,'Vui lòng nhập Địa thức (1–100).');if(d===null)return null;
   nn=clampNum($('qcN3').value,1,100,'Vui lòng nhập Nhân thức (1–100).');if(nn===null)return null;
  }
  upN=modK(t,8);loN=modK(d,8);dong=modK(nn,6);
  meta.thuc=[t,d,nn];
 }
 meta.upN=upN;meta.loN=loN;meta.dong=dong;
 var cc=castFromULD(upN-1,loN-1,dong);
 return {m:curM,vals:cc.vals,yang:cc.yang,mv:cc.mv,dong:dong,q:q,dom:dom,meta:meta};
}
/* ============ HIỆU ỨNG GIEO ============ */
var casting=false,rot=[0,0,0],VALNAME={6:'Lão Âm · hào âm động',7:'Thiếu Dương · hào dương',8:'Thiếu Âm · hào âm',9:'Lão Dương · hào dương động'};
function flipCoins(){
 var wraps=document.querySelectorAll('#coinsRow .coin-wrap');
 var coins=document.querySelectorAll('#coinsRow .coin');
 wraps.forEach(function(w){w.classList.remove('jump');});
 if(wraps[0])void wraps[0].offsetWidth;
 wraps.forEach(function(w){w.classList.add('jump');});
 var faces=[],sum=0;
 coins.forEach(function(c,i){
  var heads=Math.random()<0.5;
  faces.push(heads);sum+=heads?3:2;
  var cur=((rot[i]%360)+360)%360,want=heads?0:180;
  var delta=((want-cur)%360+360)%360;
  rot[i]+=(3+Math.floor(Math.random()*3))*360+delta;
  c.style.transform='rotateX('+rot[i]+'deg)';
 });
 if(navigator.vibrate){try{navigator.vibrate(12);}catch(e){}}
 return {faces:faces,sum:sum};
}
function startCast(){
 if(casting)return;
 var cast=gatherCast();
 if(!cast)return;
 casting=true;
 var btn=$('btnCast');btn.disabled=true;btn.textContent='ĐANG KHỞI QUẺ...';
 $('result').innerHTML='';$('castHex').innerHTML='';
 $('castCard').style.display='block';
 var useCoins=cast.m==='coins'||(cast.m==='quycoc'&&cast.meta.mode==='xu');
 $('coinsRow').style.display=useCoins?'flex':'none';
 $('castCard').scrollIntoView({behavior:'smooth',block:'center'});
 if(cast.m==='coins'){cast.vals=[];setTimeout(function(){doRound(cast,0);},600);}
 else if(useCoins){setTimeout(function(){doQRound(cast,0);},600);}
 else{quickReveal(cast,0);}
}
function doRound(cast,r){
 if(r>=6){finishCast(cast);return;}
 $('castStatus').innerHTML='Lần gieo thứ <b>'+(r+1)+' / 6</b> — tụ khí vào ba đồng xu...';
 var f=flipCoins();
 setTimeout(function(){
  var faceTxt=f.faces.map(function(x){return x?'Ngửa':'Sấp';}).join(' · ');
  var numTxt=f.faces.map(function(x){return x?3:2;}).join('+');
  cast.vals.push(f.sum);
  $('castStatus').innerHTML='Lần <b>'+(r+1)+'</b>: '+faceTxt+' = '+numTxt+' = <b>'+f.sum+'</b><br><b>'+VALNAME[f.sum]+'</b>'+(f.sum===6||f.sum===9?' — hào động!':'');
  var yang=f.sum===7||f.sum===9,mv=f.sum===6||f.sum===9;
  var y=document.createElement('div');
  y.className='yao'+(mv?' mv':'');
  y.innerHTML='<div class="bars">'+(yang?'<span class="b full"></span>':'<span class="b half"></span><span class="b half"></span>')+'</div><span class="mk">'+(mv?(yang?'○':'✕'):'')+'</span>';
  $('castHex').appendChild(y);
  setTimeout(function(){doRound(cast,r+1);},650);
 },1050);
}
function doQRound(cast,r){
 var thuc=cast.meta.thuc;
 if(r>=3){
  var upN=modK(thuc[0],8),loN=modK(thuc[1],8),dong=modK(thuc[2],6);
  cast.dong=dong;cast.meta.upN=upN;cast.meta.loN=loN;cast.meta.dong=dong;
  var cc=castFromULD(upN-1,loN-1,dong);
  cast.vals=cc.vals;cast.yang=cc.yang;cast.mv=cc.mv;
  finishCast(cast);return;
 }
 $('castStatus').innerHTML='Lần gieo <b>'+(r+1)+' / 3</b> — tụ khí cầu <b>'+['Thiên Thức','Địa Thức','Nhân Thức'][r]+'</b>...';
 var f=flipCoins();
 setTimeout(function(){
  thuc.push(f.sum);
  var faceTxt=f.faces.map(function(x){return x?'Ngửa':'Sấp';}).join(' · ');
  $('castStatus').innerHTML='<b>'+['Thiên Thức','Địa Thức','Nhân Thức'][r]+'</b>: '+faceTxt+' = <b>'+f.sum+'</b>';
  setTimeout(function(){doQRound(cast,r+1);},800);
 },1050);
}
function revealSteps(cast){
 var meta=cast.meta,s=[];
 if(cast.m==='maihoa'){
  s.push('Khởi cục Mai Hoa — '+(meta.kind==='time'?'lấy quẻ theo thời gian':meta.kind==='num'?'lấy quẻ theo vãn số':'lấy quẻ theo tự số')+'...');
  if(meta.kind==='time')s.push('Năm '+CHINAME[meta.yc-1]+' ('+meta.yc+') + tháng '+meta.lm+' + ngày '+meta.ld+' = '+(meta.yc+meta.lm+meta.ld));
  else if(meta.kind==='num')s.push('Ba số: '+meta.a+' · '+meta.b+' · '+meta.c);
  else s.push('Câu: "'+esc(meta.txt||'')+'"');
  s.push('Thượng quái: '+TRI[meta.upN-1].sym+' '+TRI[meta.upN-1].name+' ('+meta.upN+') — Hạ quái: '+TRI[meta.loN-1].sym+' '+TRI[meta.loN-1].name+' ('+meta.loN+')');
  s.push('Hào động: hào '+POSNAME[meta.dong-1]+' ('+meta.dong+') — nhất động dẫn biến toàn quẻ');
 }else{
  var th=meta.thuc;
  s.push('Quỷ Cốc khởi thức — Tam Tài Thiên Địa Nhân...');
  s.push('Thiên Thức: <b>'+th[0]+'</b> → '+th[0]+' mod 8 = '+meta.upN+' → thượng '+TRI[meta.upN-1].sym+' '+TRI[meta.upN-1].name);
  s.push('Địa Thức: <b>'+th[1]+'</b> → '+th[1]+' mod 8 = '+meta.loN+' → hạ '+TRI[meta.loN-1].sym+' '+TRI[meta.loN-1].name);
  s.push('Nhân Thức: <b>'+th[2]+'</b> → '+th[2]+' mod 6 = '+meta.dong+' → hào '+POSNAME[meta.dong-1]+' động');
 }
 return s;
}
function quickReveal(cast,i){
 var steps=cast._st||(cast._st=revealSteps(cast));
 if(i<steps.length){
  $('castStatus').innerHTML=steps[i];
  setTimeout(function(){quickReveal(cast,i+1);},780);
  return;
 }
 $('castHex').innerHTML=castHexHTML(cast.yang,cast.mv);
 setTimeout(function(){finishCast(cast);},950);
}
/* ============ KHỐI KHOA HỌC & TOÁN HỌC ============ */
function sciHTML(p){
 var C=2*Math.PI*52,len=C*p.score/100;
 var entTxt=p.ent.H===0?'tuyệt đối trật tự — quẻ thuần nhất một chiều, thế cực mà ít biến hóa'
  :p.ent.H<0.65?'thiên về trật tự — một khí âm/dương áp đảo, vận thế nghiêng hẳn một phía'
  :p.ent.H<0.95?'trật tự tương đối — vận thế có trục chính rõ ràng, ít nhiễu loạn'
  :'cân bằng âm dương cao — hỗn độn sinh biến, cục diện mở ra nhiều khả năng';
 var hdLine=[];['Kim','Mộc','Thủy','Hỏa','Thổ'].forEach(function(e){hdLine.push(e+' '+p.hd.cnt[e]);});
 return '<h3>Phân Tích Khoa Học &amp; Toán Học</h3><div class="sci">'
 +'<div class="gaugew"><svg width="118" height="118" viewBox="0 0 120 120" role="img" aria-label="Độ hợp quẻ">'
 +'<defs><linearGradient id="gg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f2dc8d"/><stop offset="1" stop-color="#7b4bd6"/></linearGradient></defs>'
 +'<circle cx="60" cy="60" r="52" fill="none" stroke="rgba(212,175,55,.15)" stroke-width="9"/>'
 +'<circle cx="60" cy="60" r="52" fill="none" stroke="url(#gg)" stroke-width="9" stroke-linecap="round" stroke-dasharray="'+len.toFixed(1)+' '+C.toFixed(1)+'" transform="rotate(-90 60 60)" style="filter:drop-shadow(0 0 6px rgba(212,175,55,.8))"/>'
 +'<text x="60" y="57" text-anchor="middle" font-size="21" fill="#f2dc8d" font-family="Georgia,serif" font-weight="bold">'+p.score+'%</text>'
 +'<text x="60" y="75" text-anchor="middle" font-size="8.5" fill="#b9a98a" font-family="Georgia,serif" letter-spacing="1">ĐỘ HỢP QUẺ</text></svg>'
 +'<div class="gtxt grow"><div class="big">'+p.score+'%</div><div class="dim" style="margin-top:4px">Chỉ số tổng hợp có trọng số:<br>hợp lĩnh vực hỏi 30% · '+p.tdShort+' 30% · cân bằng ngũ hành 20% · vị trí hào động 20%.</div></div></div>'
 +'<div class="mrow"><span class="k">Xác suất Bayes · tham chiếu</span><span class="v">'+pct(p.by.p0)+' → '+pct(p.by.p1)+'</span></div>'
 +'<div class="dim" style="padding:2px 2px 7px">Mô hình giả định: prior P(quẻ) = 1/64 ≈ 1.56%; cập nhật theo độ phù hợp câu hỏi–lĩnh vực (LR ≈ '+p.by.LR.toFixed(2)+', độ hợp '+Math.round(p.fit*100)+'%).</div>'
 +'<div class="mrow"><span class="k">Entropy Shannon 6 hào</span><span class="v">H = '+p.ent.H.toFixed(2)+' bit · '+p.ent.y+' dương / '+(6-p.ent.y)+' âm</span></div>'
 +'<div class="dim" style="padding:2px 2px 7px">H = −Σ p·log₂(p) — '+entTxt+'.</div>'
 +'<div class="mrow"><span class="k">Số Hà Đồ · Điểm ngũ hành</span><span class="v">'+Math.round(p.hd.bal*100)+'% cân bằng</span></div>'
 +'<div class="dim" style="padding:2px 2px 7px">'+hdLine.join(' · ')+' — quy theo Thủy 1·6, Hỏa 2·7, Mộc 3·8, Kim 4·9, Thổ 5·10; cân bằng đo bằng entropy chuẩn hóa của phân phối hành qua bản, hỗ, biến quẻ.</div>'
 +'<div class="mrow"><span class="k">Fibonacci · Tỷ lệ vàng φ</span><span class="v">'+p.fb.lo+' – '+p.fb.hi+' ngày</span></div>'
 +'<div class="dim" style="padding:2px 2px 7px">Số quẻ '+p.num+' nằm giữa '+p.fb.lo+' và '+p.fb.hi+' trong dãy Fibonacci (1, 2, 3, 5, 8, 13, 21, 34, 55, 89) — ứng kỳ gợi ý; φ = 1.618 là nhịp sinh trưởng tự nhiên của vạn vật.</div>'
 +'<div class="mrow"><span class="k">— Hợp lĩnh vực hỏi</span><span class="v">'+Math.round(p.fit*100)+'%</span></div>'
 +'<div class="mrow"><span class="k">— '+p.tdLabel+'</span><span class="v">'+Math.round(p.tdScore*100)+'%</span></div>'
 +'<div class="mrow"><span class="k">— Cân bằng ngũ hành</span><span class="v">'+Math.round(p.hd.bal*100)+'%</span></div>'
 +'<div class="mrow"><span class="k">— Vị trí hào động</span><span class="v">'+Math.round(p.mvq*100)+'%</span></div>'
 +'<p class="note" style="text-align:left;margin-top:6px">⚠ Liêm chính: đây là <b>mô hình tham chiếu giải trí</b> kết hợp toán học với biểu tượng Dịch học, không phải dự báo tuyệt đối — quẻ chỉ đường, người quyết định.</p>'
 +'</div>';
}
function layer(tag,title,body){
 return '<div class="layer"><div class="lt">'+tag+'</div><div class="lc"><b>'+title+'</b>'+body+'</div></div>';
}
/* ============ KẾT QUẢ TỔNG HỢP ============ */
function resultHTML(q,dom,cast,forModal){
 var vals=cast.vals,method=cast.m||'coins',meta=cast.meta||{};
 var yang=vals.map(function(v){return v===7||v===9;});
 var mv=vals.map(function(v){return v===6||v===9;});
 var base=numFromYang(yang),x=BYN[base.num];
 var mvPos=[];mv.forEach(function(b,i){if(b)mvPos.push(i);});
 var hasMv=mvPos.length>0,bx=null,cyang=null,binfo=null;
 if(hasMv){cyang=yang.map(function(y,i){return mv[i]?!y:y;});binfo=numFromYang(cyang);bx=BYN[binfo.num];}
 var nuc=nuclear(yang),nx=BYN[nuc.num],ny=yangFromTri(nuc.up,nuc.lo);
 var U=TRI[base.up],L=TRI[base.lo];
 var rel=upLoRel(base.up,base.lo);
 var td=theDung(base.up,base.lo,mv);
 var tdKey=td?tdRel(TRI[td.the].el,TRI[td.dung].el):null;
 var dong=cast.dong||meta.dong||(mvPos.length===1?mvPos[0]+1:0);
 var ent=shannon(yang),fb=fibAround(x.n),hd=haDoScore(yang,binfo);
 var fit=domainFit(q,x,dom),by=bayes(fit);
 var tdScore=td?TDREL[tdKey].s:RELSC[rel];
 var tdLabel=td?('Thể–Dụng ('+TDREL[tdKey].w+')'):'Sinh khắc thượng–hạ';
 var tdShort=td?'Thể–Dụng':'quan hệ thượng–hạ';
 var mvq,PP=[.55,.9,.45,.6,.95,.5];
 if(!hasMv)mvq=.75;else{var ss=0;mvPos.forEach(function(pp){ss+=PP[pp];});mvq=ss/mvPos.length;}
 var score=Math.round((.3*fit+.3*tdScore+.2*hd.bal+.2*mvq)*100);
 var h='<div class="card"'+(forModal?' style="border:none;background:none;box-shadow:none;padding:0"':'')+'>'
  +'<div class="res-head"><div class="res-glyph">'+glyph(x.n)+'</div>'
  +'<div class="res-name">'+x.n+'. '+esc(x.name)+'</div>'
  +'<div class="res-han">'+x.han+'</div>'
  +'<div class="res-tri">'+triInfo(x)+'</div>'
  +'<div style="margin-top:6px"><span class="mbtag">'+METHODS[method]+'</span></div></div>'
  +'<div class="hr"></div>'
  +hexHTML(yang,mv);
 h+='<div class="trio">'
  +'<div class="tcell"><div class="lab">Bản Quẻ</div>'+hMini(yang,mv)+'<div class="nm2">'+x.n+'. '+esc(x.name)+'</div><div class="sub2">'+U.name+' thượng · '+L.name+' hạ</div></div>'
  +'<div class="tcell"><div class="lab">Hỗ Quẻ</div>'+hMini(ny,null)+'<div class="nm2">'+nx.n+'. '+esc(nx.name)+'</div><div class="sub2">'+TRI[nuc.up].name+' thượng · '+TRI[nuc.lo].name+' hạ<br><a href="#" class="gox" data-n="'+nx.n+'">chi tiết ›</a></div></div>'
  +(bx?'<div class="tcell"><div class="lab">Biến Quẻ</div>'+hMini(cyang,null)+'<div class="nm2">'+bx.n+'. '+esc(bx.name)+'</div><div class="sub2">'+TRI[binfo.up].name+' thượng · '+TRI[binfo.lo].name+' hạ<br><a href="#" class="gox" data-n="'+bx.n+'">chi tiết ›</a></div></div>'
     :'<div class="tcell"><div class="lab">Biến Quẻ</div><div class="nm2" style="padding-top:24px">—</div><div class="sub2">Quẻ tĩnh, không biến</div></div>')
  +'</div>';
 h+='<h3>Đại Tượng Truyện</h3><blockquote>'+DT[x.n]+'</blockquote>'
  +'<h3>Thoán Từ</h3><blockquote>'+esc(x.t)+'</blockquote>';
 if(method==='maihoa'&&td){
  var theT=TRI[td.the],dungT=TRI[td.dung],w=TDREL[tdKey];
  var relWith=function(el2){
   if(el2===theT.el)return 'tỷ hòa với Thể';
   if(SHENG[el2]===theT.el)return '<b style="color:#8fe3a0">sinh Thể</b> (đến giúp mình)';
   if(KE[el2]===theT.el)return '<b style="color:#ff9c9c">khắc Thể</b> (đến hại mình)';
   if(SHENG[theT.el]===el2)return 'được Thể sinh cho (hao khí)';
   return 'bị Thể chế ngự';
  };
  var col=tdKey==='ds'?'#8fe3a0':tdKey==='dk'?'#ff9c9c':tdKey==='ts'?'#ffc46b':'var(--gold2)';
  var bTr=td.dungLo?TRI[binfo.lo]:TRI[binfo.up];
  var S=(base.up+1)+(base.lo+1)+dong;
  var ung='Ứng số Mai Hoa: '+(base.up+1)+' (thượng) + '+(base.lo+1)+' (hạ) + '+dong+' (động) = <b>'+S+'</b> — sự ứng nghiệm thường trong <b>'+S+' ngày</b> (việc lớn tính '+S+' tuần hoặc '+S+' tháng)';
  if(tdKey==='ds')ung+='; Dụng sinh Thể thì ứng nhanh, có khi chỉ nửa số ấy';
  else if(tdKey==='dk')ung+='; Dụng khắc Thể thì việc khó ứng, cố làm ứng chậm mà nhiều trắc trở';
  ung+='.';
  h+='<h3>Mai Hoa Luận · Thể Dụng Sinh Khắc</h3>'
   +'<p class="dim" style="margin-bottom:6px">'+esc(meta.recap||'')+'</p>'
   +'<p>Hào động nằm ở <b>'+(td.dungLo?'hạ':'thượng')+' quái</b> nên '+dungT.sym+' <b>'+dungT.name+'</b> ('+dungT.el+') là <b>Dụng</b> — sự việc, đối tượng, ngoại cảnh tác động; '+theT.sym+' <b>'+theT.name+'</b> ('+theT.el+') là <b>Thể</b> — bản thân mình, gốc của sự việc.</p>'
   +'<p style="margin-top:6px">'+w.t+' Phán: <b style="color:'+col+'">'+w.w+'</b>.</p>'
   +'<p style="margin-top:6px">Diễn biến giữa chừng xem ở <b>Hỗ quẻ '+nx.n+'. '+esc(nx.name)+'</b>: hỗ thượng '+TRI[nuc.up].sym+' '+TRI[nuc.up].name+' ('+TRI[nuc.up].el+') '+relWith(TRI[nuc.up].el)+'; hỗ hạ '+TRI[nuc.lo].sym+' '+TRI[nuc.lo].name+' ('+TRI[nuc.lo].el+') '+relWith(TRI[nuc.lo].el)+'.</p>'
   +'<p style="margin-top:6px">Kết cục xem ở <b>Biến quẻ '+bx.n+'. '+esc(bx.name)+'</b>: quái biến '+bTr.name+' ('+bTr.el+') '+relWith(bTr.el)+' — đây là hướng đi cuối cùng của sự việc.</p>'
   +'<p style="margin-top:6px">'+ung+'</p>';
 }
 if(method==='quycoc'){
  var modeName=meta.mode==='rand'?'Ngẫu nhiên ba số':(meta.mode==='num'?'Tự nhập ba số':'Gieo ba đồng xu ba lần');
  var nTri=TRI[dong<=3?base.lo:base.up];
  h+='<h3>Quỷ Cốc Tam Tài · Thiên — Địa — Nhân</h3>'
   +'<p class="dim" style="margin-bottom:6px">Phép Quỷ Cốc Tiên Sinh Thần Toán ('+modeName+').</p>'
   +'<div class="mrow"><span class="k">Thiên Thức · thiên thời</span><span class="v">'+meta.thuc[0]+' → '+U.sym+' '+U.name+' thượng ('+U.el+')</span></div>'
   +'<div class="mrow"><span class="k">Địa Thức · địa lợi</span><span class="v">'+meta.thuc[1]+' → '+L.sym+' '+L.name+' hạ ('+L.el+')</span></div>'
   +'<div class="mrow"><span class="k">Nhân Thức · nhân hòa</span><span class="v">'+meta.thuc[2]+' → hào '+POSNAME[dong-1]+' động</span></div>'
   +'<p style="margin-top:8px">Chiêm sách phán: Thiên thức hội <b>'+U.name+'</b>, '+QCT[base.up]+'. Địa thức hội <b>'+L.name+'</b>, '+QCD[base.lo]+'. Nhân thức động vào <b>'+nTri.name+'</b>, '+QCN[dong<=3?base.lo:base.up]+'.</p>'
   +'<blockquote>'+qcVerdict(rel,dong)+'</blockquote>';
 }
 var hanh;
 if(dom==='tq'){
  hanh='<span class="tag">Sự nghiệp</span>'+esc(x.c)+'<br><span class="tag" style="margin-top:6px">Tài lộc</span>'+esc(x.w)+'<br><span class="tag" style="margin-top:6px">Tình duyên</span>'+esc(x.l)+'<br><span class="tag" style="margin-top:6px">Sức khỏe</span>'+esc(x.h);
 }else{
  var map={sn:['Sự nghiệp',x.c],tl:['Tài lộc',x.w],td:['Tình duyên',x.l],sk:['Sức khỏe',x.h]};
  hanh='<span class="tag">'+map[dom][0]+'</span>'+map[dom][1];
 }
 var gioi;
 if(hasMv){
  var gl=[];
  mvPos.forEach(function(pp){
   gl.push('<b style="color:var(--gold2)">Hào '+POSNAME[pp]+' ('+(pp+1)+') động:</b> '+MOVTXT[pp]);
  });
  gioi=gl.join('<br>');
  if(mvPos.length>1)gioi+='<br><span class="dim">Nhiều hào cùng động: lấy ý tổng quẻ làm chủ, các hào động cho biết diễn biến từng giai đoạn.</span>';
 }else{
  gioi='Quẻ tĩnh, sáu hào an: cục diện ổn định, kỵ nhất là nóng vội thay đổi khi chưa đến thời; giữ gìn hiện trạng, thận trọng từng bước nhỏ.'
   +(rel==='uk'||rel==='lk'?' Thượng hạ tương khắc: đặc biệt tránh xung đột trực diện với bề trên và hoàn cảnh, lui một bước để giữ toàn cục.':' Thuận thế mà làm, chớ sinh lòng kiêu căng khi mọi sự đang yên.');
 }
 var ung2='Số quẻ '+x.n+' nằm giữa hai số Fibonacci '+fb.lo+' và '+fb.hi+' — ứng kỳ ứng nghiệm gợi ý trong khoảng <b>'+fb.lo+'–'+fb.hi+' ngày</b> (việc lớn tính theo tuần hoặc tháng).';
 if(method!=='coins'&&dong){
  var S2=(base.up+1)+(base.lo+1)+dong;
  ung2+=' Theo phép '+METHODS[method]+', ứng số = '+(base.up+1)+' + '+(base.lo+1)+' + '+dong+' = <b>'+S2+'</b> — thường ứng trong '+S2+' ngày.';
 }
 h+='<h3>Luận Giải Năm Lớp · Thởi — Thế — Hành — Giới — Ứng</h3>'
  +layer('時','Thởi · Thởi Vận','Theo phép '+METHODS[method]+': '+RELTXT[rel])
  +layer('勢','Thế · Cục Diện',esc(x.m))
  +layer('行','Hành · Việc Nên Làm',hanh)
  +layer('戒','Giới · Điều Cần Tránh',gioi)
  +layer('應','Ứng · Ứng Kỳ',ung2);
 if(hasMv)h+='<h3>Biến Quẻ · '+bx.n+'. '+esc(bx.name)+'</h3><p>'+esc(bx.m)+'</p>';
 h+='<h3>Phân Tích Hà Đồ · Lạc Thư</h3><p>'+elemAnalysis(x.up,x.lo)+'</p>';
 h+=sciHTML({score:score,by:by,ent:ent,hd:hd,fb:fb,fit:fit,tdScore:tdScore,tdLabel:tdLabel,tdShort:tdShort,mvq:mvq,num:x.n});
 h+='<h3>Lời Kết</h3><blockquote>'+KET[(x.n+dong)%KET.length]+'</blockquote>';
 h+='</div>';
 return {html:h,bien:bx?bx.n:0,num:x.n};
}
function bindGox(root){
 root.querySelectorAll('.gox').forEach(function(a){
  a.addEventListener('click',function(e){e.preventDefault();openModal(detailHTML(BYN[+a.dataset.n]));});
 });
}
function finishCast(cast){
 $('castStatus').innerHTML='Tượng quẻ đã thành — <b>chiêm nghiệm...</b>';
 var res=resultHTML(cast.q,cast.dom,cast,false);
 setTimeout(function(){
  $('result').innerHTML=res.html;
  bindGox($('result'));
  var m2={};for(var k in cast.meta)m2[k]=cast.meta[k];
  saveHis({t:Date.now(),q:cast.q,dom:cast.dom,vals:cast.vals,num:res.num,bien:res.bien,m:cast.m,meta:m2});
  $('result').scrollIntoView({behavior:'smooth',block:'start'});
  casting=false;
  var btn=$('btnCast');btn.disabled=false;btn.textContent=BTNLBL[cast.m];
 },700);
}
$('btnCast').addEventListener('click',startCast);

/* ============ LỊCH SỬ ============ */
function hisAll(){
 try{return JSON.parse(read('kd_history')||'[]');}catch(e){return[];}
}
function saveHis(it){
 var a=hisAll();a.unshift(it);if(a.length>50)a.length=50;
 store('kd_history',JSON.stringify(a));
}
function fmtTime(t){
 var d=new Date(t);
 function p(n){return (n<10?'0':'')+n;}
 return p(d.getHours())+':'+p(d.getMinutes())+' · '+p(d.getDate())+'/'+(p(d.getMonth()+1))+'/'+d.getFullYear();
}
function renderHis(){
 var a=hisAll(),h='';
 if(!a.length){$('hisList').innerHTML='<div class="empty">Chưa có lần gieo nào. Hãy thành tâm gieo quẻ đầu tiên.</div>';return;}
 a.forEach(function(it,i){
  var x=BYN[it.num];
  h+='<div class="hex-item" data-i="'+i+'"><span class="gl">'+glyph(it.num)+'</span>'
   +'<span class="nm"><b>'+(x?it.num+'. '+esc(x.name):'')+(it.bien?' → '+it.bien:'')+'</b>'
   +'<span class="his-q">'+(it.m&&it.m!=='coins'?'<span class="mbtag">'+METHODS[it.m]+'</span>':'')+esc(it.q||'(không ghi câu hỏi)')+' · '+DOMS[it.dom]+'<br>'+fmtTime(it.t)+'</span></span>'
   +'<button class="del" data-i="'+i+'">Xóa</button></div>';
 });
 $('hisList').innerHTML=h;
 $('hisList').querySelectorAll('.del').forEach(function(b){
  b.addEventListener('click',function(e){
   e.stopPropagation();
   var arr=hisAll();arr.splice(+b.dataset.i,1);
   store('kd_history',JSON.stringify(arr));renderHis();
  });
 });
 $('hisList').querySelectorAll('.hex-item').forEach(function(it){
  it.addEventListener('click',function(){
   var item=hisAll()[+it.dataset.i];
   if(!item)return;
   var mm=item.m||'coins';
   var res=resultHTML(item.q,item.dom,{vals:item.vals,m:mm,meta:item.meta||{}},true);
   var head='<p class="dim" style="margin-bottom:8px"><span class="mbtag">'+METHODS[mm]+'</span>'+esc(item.q||'(không ghi câu hỏi)')+'<br>'+DOMS[item.dom]+' · '+fmtTime(item.t)+'</p>';
   openModal(head+res.html);
   bindGox($('mBody'));
  });
 });
}
$('clearHis').addEventListener('click',function(){
 store('kd_history','[]');renderHis();
});
/* ============ THÊM VÀO MÀN HÌNH CHÍNH ============ */
(function a2hs(){
 if(read('kd_a2hs')==='1')return;
 setTimeout(function(){$('a2hs').classList.add('show');},1500);
 $('a2hsX').addEventListener('click',function(){
  $('a2hs').classList.remove('show');store('kd_a2hs','1');
 });
})();
