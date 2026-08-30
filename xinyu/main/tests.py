import json
from unittest.mock import patch

from django.test import TestCase

from main.models import examquestion, exampaper, examrecord, jiankangyujing, popupremind, xinliyisheng, xinqingriji, yonghu, users, yuyuezixun
from util.auth import Auth


class YuyuezixunPrivacyTests(TestCase):
    def setUp(self):
        self.user_a = yonghu.objects.create(
            id=1001,
            yonghuzhanghao="user_a",
            mima="123456",
            yonghuxingming="用户A",
        )
        self.user_b = yonghu.objects.create(
            id=1002,
            yonghuzhanghao="user_b",
            mima="123456",
            yonghuxingming="用户B",
        )
        self.doctor_a = xinliyisheng.objects.create(
            id=2001,
            yishenggonghao="doc_a",
            mima="123456",
            yishengxingming="医生A",
        )
        self.doctor_b = xinliyisheng.objects.create(
            id=2002,
            yishenggonghao="doc_b",
            mima="123456",
            yishengxingming="医生B",
        )
        self.record_a = yuyuezixun.objects.create(
            id=3001,
            yishenggonghao="doc_a",
            yishengxingming="医生A",
            zixunmingcheng="A的预约",
            zixunleixing="心理咨询",
            yuyueshiduan="上午",
            yonghuzhanghao="user_a",
            yonghuxingming="用户A",
            yuyueshijian="2026-05-10",
            sfsh="待审核",
        )
        self.record_b = yuyuezixun.objects.create(
            id=3002,
            yishenggonghao="doc_b",
            yishengxingming="医生B",
            zixunmingcheng="B的预约",
            zixunleixing="心理咨询",
            yuyueshiduan="下午",
            yonghuzhanghao="user_b",
            yonghuxingming="用户B",
            yuyueshijian="2026-05-10",
            sfsh="是",
        )

    def auth_header(self, model, obj):
        login_column = getattr(model, "__loginUserColumn__", "username")
        data = {
            "id": obj.id,
            login_column: getattr(obj, login_column),
        }
        if hasattr(obj, "yonghuxingming"):
            data["yonghuxingming"] = obj.yonghuxingming
        if hasattr(obj, "yishengxingming"):
            data["yishengxingming"] = obj.yishengxingming
        return {"HTTP_TOKEN": Auth().get_token(model, data)}

    def record_names(self, response):
        payload = json.loads(response.content.decode("utf-8"))
        return [item["zixunmingcheng"] for item in payload["data"]["list"]]

    def payload(self, response):
        return json.loads(response.content.decode("utf-8"))

    def test_yonghu_page_only_returns_own_appointments(self):
        response = self.client.get(
            "/xinyu/yuyuezixun/page",
            {"page": 1, "limit": 10},
            **self.auth_header(yonghu, self.user_a),
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.record_names(response), ["A的预约"])

    def test_xinliyisheng_page_only_returns_own_appointments(self):
        response = self.client.get(
            "/xinyu/yuyuezixun/page",
            {"page": 1, "limit": 10},
            **self.auth_header(xinliyisheng, self.doctor_b),
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.record_names(response), ["B的预约"])

    def test_lists_only_returns_current_users_appointments(self):
        response = self.client.get(
            "/xinyu/yuyuezixun/lists",
            {"page": 1, "limit": 10},
            **self.auth_header(yonghu, self.user_a),
        )
        payload = self.payload(response)

        self.assertEqual(response.status_code, 200)
        self.assertEqual([item["zixunmingcheng"] for item in payload["data"]], ["A的预约"])

    def test_query_does_not_return_another_users_appointment(self):
        response = self.client.get(
            "/xinyu/yuyuezixun/query",
            {"id": self.record_b.id},
            **self.auth_header(yonghu, self.user_a),
        )
        payload = self.payload(response)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(payload["code"], 0)
        self.assertEqual(payload["data"], {})

    def test_autosort_only_returns_current_doctors_appointments(self):
        response = self.client.get(
            "/xinyu/yuyuezixun/autoSort",
            {"page": 1, "limit": 10},
            **self.auth_header(xinliyisheng, self.doctor_b),
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.record_names(response), ["B的预约"])

    def test_front_list_requires_login(self):
        response = self.client.get(
            "/xinyu/yuyuezixun/list",
            {"page": 1, "limit": 10},
        )
        payload = json.loads(response.content.decode("utf-8"))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(payload["code"], 401)

    def test_user_cannot_read_another_users_detail(self):
        response = self.client.get(
            f"/xinyu/yuyuezixun/detail/{self.record_b.id}",
            **self.auth_header(yonghu, self.user_a),
        )
        payload = json.loads(response.content.decode("utf-8"))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(payload["code"], 403)

    def test_user_cannot_delete_another_users_appointment(self):
        response = self.client.post(
            "/xinyu/yuyuezixun/delete",
            data=json.dumps([self.record_b.id]),
            content_type="application/json",
            **self.auth_header(yonghu, self.user_a),
        )
        payload = json.loads(response.content.decode("utf-8"))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(payload["code"], 403)
        self.assertTrue(yuyuezixun.objects.filter(id=self.record_b.id).exists())

    def test_user_cannot_batch_audit_appointments(self):
        response = self.client.post(
            "/xinyu/yuyuezixun/shBatch",
            data=json.dumps({
                "ids": [self.record_a.id],
                "sfsh": "是",
                "shhf": "通过",
            }),
            content_type="application/json",
            **self.auth_header(yonghu, self.user_a),
        )
        payload = self.payload(response)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(payload["code"], 403)
        self.record_a.refresh_from_db()
        self.assertEqual(self.record_a.sfsh, "待审核")

    def test_doctor_cannot_batch_audit_other_doctors_appointment(self):
        response = self.client.post(
            "/xinyu/yuyuezixun/shBatch",
            data=json.dumps({
                "ids": [self.record_b.id],
                "sfsh": "否",
                "shhf": "拒绝",
            }),
            content_type="application/json",
            **self.auth_header(xinliyisheng, self.doctor_a),
        )
        payload = self.payload(response)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(payload["code"], 403)
        self.record_b.refresh_from_db()
        self.assertEqual(self.record_b.sfsh, "是")

    def test_user_cannot_use_backend_save_endpoint(self):
        response = self.client.post(
            "/xinyu/yuyuezixun/save",
            data=json.dumps({
                "yishenggonghao": "doc_a",
                "yishengxingming": "医生A",
                "zixunmingcheng": "后台绕过预约",
                "zixunleixing": "心理咨询",
                "yuyueshiduan": "晚上",
                "yonghuzhanghao": "user_a",
                "yonghuxingming": "用户A",
                "yuyueshijian": "2026-05-12",
            }),
            content_type="application/json",
            **self.auth_header(yonghu, self.user_a),
        )
        payload = self.payload(response)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(payload["code"], 403)
        self.assertFalse(yuyuezixun.objects.filter(zixunmingcheng="后台绕过预约").exists())

    def test_doctor_update_only_changes_review_fields(self):
        response = self.client.post(
            "/xinyu/yuyuezixun/update",
            data=json.dumps({
                "id": self.record_a.id,
                "sfsh": "是",
                "shhf": "审核通过",
                "yishenggonghao": "doc_b",
                "yonghuzhanghao": "user_b",
                "zixunmingcheng": "篡改后的预约",
            }),
            content_type="application/json",
            **self.auth_header(xinliyisheng, self.doctor_a),
        )
        payload = self.payload(response)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(payload["code"], 0)
        self.record_a.refresh_from_db()
        self.assertEqual(self.record_a.sfsh, "是")
        self.assertEqual(self.record_a.shhf, "审核通过")
        self.assertEqual(self.record_a.yishenggonghao, "doc_a")
        self.assertEqual(self.record_a.yonghuzhanghao, "user_a")
        self.assertEqual(self.record_a.zixunmingcheng, "A的预约")

    def test_add_locks_user_identity_to_current_user(self):
        with patch("main.model.time.time", return_value=4):
            response = self.client.post(
                "/xinyu/yuyuezixun/add",
                data=json.dumps({
                    "yishenggonghao": "doc_a",
                    "yishengxingming": "医生A",
                    "zixunmingcheng": "伪造账号预约",
                    "zixunleixing": "心理咨询",
                    "yuyueshiduan": "上午",
                    "yonghuzhanghao": "user_b",
                    "yonghuxingming": "用户B",
                    "yuyueshijian": "2026-05-11",
                }),
                content_type="application/json",
                **self.auth_header(yonghu, self.user_a),
            )
        payload = json.loads(response.content.decode("utf-8"))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(payload["code"], 0)
        record = yuyuezixun.objects.get(zixunmingcheng="伪造账号预约")
        self.assertEqual(record.yonghuzhanghao, "user_a")
        self.assertEqual(record.yonghuxingming, "用户A")

    def test_add_rejects_occupied_doctor_time_slot_even_if_owned_by_other_user(self):
        response = self.client.post(
            "/xinyu/yuyuezixun/add",
            data=json.dumps({
                "yishenggonghao": "doc_a",
                "yishengxingming": "医生A",
                "zixunmingcheng": "重复时段预约",
                "zixunleixing": "心理咨询",
                "yuyueshiduan": "上午",
                "yonghuzhanghao": "user_b",
                "yonghuxingming": "用户B",
                "yuyueshijian": "2026-05-10",
            }),
            content_type="application/json",
            **self.auth_header(yonghu, self.user_b),
        )
        payload = self.payload(response)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(payload["code"], 10002)
        self.assertFalse(yuyuezixun.objects.filter(zixunmingcheng="重复时段预约").exists())

    def test_schema_follow_cannot_read_yuyuezixun_records(self):
        response = self.client.get(
            "/xinyu/follow/yuyuezixun/id",
            {"columnValue": self.record_b.id},
            **self.auth_header(yonghu, self.user_a),
        )
        payload = self.payload(response)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(payload["code"], 403)

    def test_schema_option_cannot_enumerate_yuyuezixun_fields(self):
        response = self.client.get(
            "/xinyu/option/yuyuezixun/yonghuzhanghao",
            **self.auth_header(yonghu, self.user_a),
        )
        payload = self.payload(response)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(payload["code"], 403)


class XinqingrijiPrivacyTests(TestCase):
    def setUp(self):
        self.user_a = yonghu.objects.create(
            id=1101,
            yonghuzhanghao="user_a",
            mima="123456",
            yonghuxingming="用户A",
        )
        self.user_b = yonghu.objects.create(
            id=1102,
            yonghuzhanghao="user_b",
            mima="123456",
            yonghuxingming="用户B",
        )
        self.doctor = xinliyisheng.objects.create(
            id=2101,
            yishenggonghao="doc_a",
            mima="123456",
            yishengxingming="医生A",
        )
        self.admin = users.objects.create(
            id=9101,
            username="admin",
            password="123456",
            role="管理员",
        )
        self.diary_a = xinqingriji.objects.create(
            id=4101,
            rijibiaoti="A的日记",
            rijineirong="A private",
            fabushijian="2026-05-10 09:00:00",
            yonghuzhanghao="user_a",
            yonghuxingming="用户A",
            thumbsupnum=3,
            crazilynum=1,
            discussnum=2,
            storeupnum=4,
        )
        self.diary_b = xinqingriji.objects.create(
            id=4102,
            rijibiaoti="B的日记",
            rijineirong="B private",
            fabushijian="2026-05-10 10:00:00",
            yonghuzhanghao="user_b",
            yonghuxingming="用户B",
            thumbsupnum=5,
            crazilynum=0,
            discussnum=1,
            storeupnum=6,
        )

    def auth_header(self, model, obj):
        login_column = getattr(model, "__loginUserColumn__", "username")
        data = {
            "id": obj.id,
            login_column: getattr(obj, login_column),
        }
        if hasattr(obj, "yonghuxingming"):
            data["yonghuxingming"] = obj.yonghuxingming
        if hasattr(obj, "yishengxingming"):
            data["yishengxingming"] = obj.yishengxingming
        return {"HTTP_TOKEN": Auth().get_token(model, data)}

    def payload(self, response):
        return json.loads(response.content.decode("utf-8"))

    def diary_titles(self, response):
        payload = self.payload(response)
        return [item["rijibiaoti"] for item in payload["data"]["list"]]

    def message_titles(self, response):
        payload = self.payload(response)
        return [item["title"] for item in payload["data"]["list"]]

    def test_yonghu_page_only_returns_own_diaries(self):
        response = self.client.get(
            "/xinyu/xinqingriji/page",
            {"page": 1, "limit": 10, "sort": "id", "order": "asc"},
            **self.auth_header(yonghu, self.user_a),
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.diary_titles(response), ["A的日记"])

    def test_xinliyisheng_page_can_read_all_diaries(self):
        response = self.client.get(
            "/xinyu/xinqingriji/page",
            {"page": 1, "limit": 10, "sort": "id", "order": "asc"},
            **self.auth_header(xinliyisheng, self.doctor),
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.diary_titles(response), ["A的日记", "B的日记"])

    def test_admin_page_can_read_all_diaries(self):
        response = self.client.get(
            "/xinyu/xinqingriji/page",
            {"page": 1, "limit": 10, "sort": "id", "order": "asc"},
            **self.auth_header(users, self.admin),
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.diary_titles(response), ["A的日记", "B的日记"])

    def test_front_list_requires_login(self):
        response = self.client.get(
            "/xinyu/xinqingriji/list",
            {"page": 1, "limit": 10},
        )
        payload = self.payload(response)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(payload["code"], 401)

    def test_user_cannot_read_another_users_detail(self):
        response = self.client.get(
            f"/xinyu/xinqingriji/detail/{self.diary_b.id}",
            **self.auth_header(yonghu, self.user_a),
        )
        payload = self.payload(response)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(payload["code"], 403)

    def test_user_query_does_not_return_another_users_diary(self):
        response = self.client.get(
            "/xinyu/xinqingriji/query",
            {"id": self.diary_b.id},
            **self.auth_header(yonghu, self.user_a),
        )
        payload = self.payload(response)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(payload["code"], 0)
        self.assertEqual(payload["data"], {})

    def test_user_cannot_delete_another_users_diary(self):
        response = self.client.post(
            "/xinyu/xinqingriji/delete",
            data=json.dumps([self.diary_b.id]),
            content_type="application/json",
            **self.auth_header(yonghu, self.user_a),
        )
        payload = self.payload(response)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(payload["code"], 403)
        self.assertTrue(xinqingriji.objects.filter(id=self.diary_b.id).exists())

    def test_doctor_can_read_but_cannot_update_diary(self):
        detail = self.client.get(
            f"/xinyu/xinqingriji/detail/{self.diary_a.id}",
            **self.auth_header(xinliyisheng, self.doctor),
        )
        detail_payload = self.payload(detail)

        self.assertEqual(detail.status_code, 200)
        self.assertEqual(detail_payload["code"], 0)
        self.assertEqual(detail_payload["data"]["rijibiaoti"], "A的日记")

        response = self.client.post(
            "/xinyu/xinqingriji/update",
            data=json.dumps({
                "id": self.diary_a.id,
                "rijibiaoti": "医生改名",
            }),
            content_type="application/json",
            **self.auth_header(xinliyisheng, self.doctor),
        )
        payload = self.payload(response)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(payload["code"], 403)
        self.diary_a.refresh_from_db()
        self.assertEqual(self.diary_a.rijibiaoti, "A的日记")

    def test_add_locks_diary_identity_to_current_user(self):
        with patch("main.model.time.time", return_value=5):
            response = self.client.post(
                "/xinyu/xinqingriji/add",
                data=json.dumps({
                    "rijibiaoti": "伪造账号日记",
                    "rijineirong": "不能冒充别人",
                    "fabushijian": "2026-05-10 11:00:00",
                    "yonghuzhanghao": "user_b",
                    "yonghuxingming": "用户B",
                }),
                content_type="application/json",
                **self.auth_header(yonghu, self.user_a),
            )
        payload = self.payload(response)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(payload["code"], 0)
        diary = xinqingriji.objects.get(rijibiaoti="伪造账号日记")
        self.assertEqual(diary.yonghuzhanghao, "user_a")
        self.assertEqual(diary.yonghuxingming, "用户A")

    def test_risk_keywords_in_new_diary_create_warning_for_admin_and_doctor(self):
        with patch("main.model.time.time", return_value=6):
            response = self.client.post(
                "/xinyu/xinqingriji/add",
                data=json.dumps({
                    "rijibiaoti": "最近状态",
                    "rijineirong": "最近很焦虑，也有一点抑郁。",
                    "fabushijian": "2026-05-10 12:00:00",
                }),
                content_type="application/json",
                **self.auth_header(yonghu, self.user_a),
            )
        payload = self.payload(response)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(payload["code"], 0)
        self.assertTrue(payload["warning"]["created"])
        self.assertEqual(payload["warning"]["recipientCount"], 2)
        self.assertEqual(jiankangyujing.objects.count(), 1)
        warning = jiankangyujing.objects.first()
        self.assertIn("心情日记风险预警", warning.yujingtixing)
        self.assertLessEqual(len(warning.yujingtixing), 200)
        self.assertLessEqual(len(warning.xinlijianyi), 200)
        self.assertEqual(popupremind.objects.filter(title="心情日记风险预警").count(), 2)

        admin_response = self.client.get(
            "/xinyu/popupremind/message/list",
            {"page": 1, "limit": 10, "sort": "id", "order": "asc"},
            **self.auth_header(users, self.admin),
        )
        doctor_response = self.client.get(
            "/xinyu/popupremind/message/list",
            {"page": 1, "limit": 10, "sort": "id", "order": "asc"},
            **self.auth_header(xinliyisheng, self.doctor),
        )

        self.assertIn("心情日记风险预警", self.message_titles(admin_response))
        self.assertIn("心情日记风险预警", self.message_titles(doctor_response))

    def test_risk_diary_update_does_not_duplicate_same_diary_warning(self):
        first = self.client.post(
            "/xinyu/xinqingriji/update",
            data=json.dumps({
                "id": self.diary_a.id,
                "rijineirong": "今天非常焦虑。",
            }),
            content_type="application/json",
            **self.auth_header(yonghu, self.user_a),
        )
        second = self.client.post(
            "/xinyu/xinqingriji/update",
            data=json.dumps({
                "id": self.diary_a.id,
                "rijineirong": "今天非常焦虑和抑郁。",
            }),
            content_type="application/json",
            **self.auth_header(yonghu, self.user_a),
        )

        self.assertTrue(self.payload(first)["warning"]["created"])
        self.assertFalse(self.payload(second)["warning"]["created"])
        self.assertEqual(jiankangyujing.objects.count(), 1)
        self.assertEqual(popupremind.objects.filter(title="心情日记风险预警").count(), 2)

    def test_user_update_cannot_change_owner_or_counter_fields(self):
        response = self.client.post(
            "/xinyu/xinqingriji/update",
            data=json.dumps({
                "id": self.diary_a.id,
                "rijibiaoti": "更新后的日记",
                "yonghuzhanghao": "user_b",
                "yonghuxingming": "用户B",
                "thumbsupnum": 99,
                "crazilynum": 99,
                "discussnum": 99,
                "storeupnum": 99,
            }),
            content_type="application/json",
            **self.auth_header(yonghu, self.user_a),
        )
        payload = self.payload(response)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(payload["code"], 0)
        self.diary_a.refresh_from_db()
        self.assertEqual(self.diary_a.rijibiaoti, "更新后的日记")
        self.assertEqual(self.diary_a.yonghuzhanghao, "user_a")
        self.assertEqual(self.diary_a.yonghuxingming, "用户A")
        self.assertEqual(self.diary_a.thumbsupnum, 3)
        self.assertEqual(self.diary_a.crazilynum, 1)
        self.assertEqual(self.diary_a.discussnum, 2)
        self.assertEqual(self.diary_a.storeupnum, 4)

    def test_schema_follow_cannot_read_xinqingriji_records(self):
        response = self.client.get(
            "/xinyu/follow/xinqingriji/id",
            {"columnValue": self.diary_b.id},
            **self.auth_header(yonghu, self.user_a),
        )
        payload = self.payload(response)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(payload["code"], 403)

    def test_schema_option_cannot_enumerate_xinqingriji_fields(self):
        response = self.client.get(
            "/xinyu/option/xinqingriji/yonghuzhanghao",
            **self.auth_header(yonghu, self.user_a),
        )
        payload = self.payload(response)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(payload["code"], 403)


class ExamrecordReportEntryTests(TestCase):
    def setUp(self):
        self.user_a = yonghu.objects.create(
            id=1201,
            yonghuzhanghao="exam_user_a",
            mima="123456",
            yonghuxingming="测评用户A",
        )
        self.user_b = yonghu.objects.create(
            id=1202,
            yonghuzhanghao="exam_user_b",
            mima="123456",
            yonghuxingming="测评用户B",
        )
        self.admin = users.objects.create(
            id=9201,
            username="exam_admin",
            password="123456",
            role="管理员",
        )
        self.paper = exampaper.objects.create(
            id=6201,
            name="心理压力测评",
            time=0,
            status="启用",
            examnum=10,
        )
        self.question_a = examquestion.objects.create(
            id=6301,
            paperid=self.paper.id,
            papername=self.paper.name,
            questionname="最近是否感到压力明显增加",
            options=json.dumps([
                {"code": "A", "text": "没有", "score": 0},
                {"code": "B", "text": "有一些", "score": 1},
                {"code": "C", "text": "比较明显", "score": 2},
            ], ensure_ascii=False),
            score=2,
            answer="",
            analysis="",
            type=0,
            sequence=2,
        )
        self.question_b = examquestion.objects.create(
            id=6302,
            paperid=self.paper.id,
            papername=self.paper.name,
            questionname="睡眠质量是否下降",
            options=json.dumps([
                {"code": "A", "text": "没有", "score": 0},
                {"code": "B", "text": "偶尔", "score": 1},
                {"code": "C", "text": "经常", "score": 2},
            ], ensure_ascii=False),
            score=2,
            answer="",
            analysis="",
            type=0,
            sequence=1,
        )
        self._create_record_set(self.user_a, "a-first", [1, 0])
        self._create_record_set(self.user_a, "a-second", [2, 1])
        self._create_record_set(self.user_b, "b-first", [2, 2])

    def auth_header(self, model, obj):
        login_column = getattr(model, "__loginUserColumn__", "username")
        data = {
            "id": obj.id,
            login_column: getattr(obj, login_column),
        }
        if hasattr(obj, "yonghuxingming"):
            data["yonghuxingming"] = obj.yonghuxingming
        return {"HTTP_TOKEN": Auth().get_token(model, data)}

    def payload(self, response):
        return json.loads(response.content.decode("utf-8"))

    def _create_record_set(self, user, examno, scores):
        for question, score in zip([self.question_a, self.question_b], scores):
            examrecord.objects.create(
                username=user.yonghuxingming,
                userid=user.id,
                paperid=self.paper.id,
                papername=self.paper.name,
                questionid=question.id,
                questionname=question.questionname,
                type=question.type,
                ismark=1,
                options=question.options,
                score=question.score,
                answer="",
                analysis="",
                myscore=score,
                myanswer="A",
                examno=examno,
            )

    def test_groupby_returns_one_entry_per_completed_attempt_for_current_user(self):
        response = self.client.get(
            "/xinyu/examrecord/groupby",
            {"page": 1, "limit": 10},
            **self.auth_header(yonghu, self.user_a),
        )
        payload = self.payload(response)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(payload["code"], 0)
        attempts = payload["data"]["list"]
        self.assertEqual({item["examno"] for item in attempts}, {"a-first", "a-second"})
        self.assertEqual(payload["data"]["total"], 2)
        self.assertTrue(all(item["answeredCount"] == 2 for item in attempts))
        self.assertTrue(all(item["questionCount"] == 2 for item in attempts))

    def test_userid_parameter_cannot_expose_another_users_report_entries(self):
        response = self.client.get(
            "/xinyu/examrecord/groupby",
            {"page": 1, "limit": 10, "userid": self.user_b.id},
            **self.auth_header(yonghu, self.user_a),
        )
        payload = self.payload(response)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(payload["code"], 403)

    def test_admin_can_filter_report_entries_by_userid(self):
        response = self.client.get(
            "/xinyu/examrecord/groupby",
            {"page": 1, "limit": 10, "userid": self.user_b.id},
            **self.auth_header(users, self.admin),
        )
        payload = self.payload(response)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(payload["code"], 0)
        self.assertEqual([item["examno"] for item in payload["data"]["list"]], ["b-first"])

    def test_admin_can_filter_attempt_detail_records_by_examno(self):
        response = self.client.get(
            "/xinyu/examrecord/page",
            {
                "page": 1,
                "limit": 10,
                "userid": self.user_a.id,
                "paperid": self.paper.id,
                "examno": "a-second",
            },
            **self.auth_header(users, self.admin),
        )
        payload = self.payload(response)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(payload["code"], 0)
        records = payload["data"]["list"]
        self.assertEqual(payload["data"]["total"], 2)
        self.assertTrue(all(item["userid"] == self.user_a.id for item in records))
        self.assertTrue(all(item["paperid"] == self.paper.id for item in records))
        self.assertEqual({item["examno"] for item in records}, {"a-second"})

    def test_result_returns_selected_attempt_report_without_correct_answers(self):
        response = self.client.get(
            "/xinyu/examrecord/result",
            {"paperid": self.paper.id, "examno": "a-second"},
            **self.auth_header(yonghu, self.user_a),
        )
        payload = self.payload(response)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(payload["code"], 0)
        data = payload["data"]
        self.assertEqual(data["examno"], "a-second")
        self.assertEqual(data["userid"], self.user_a.id)
        self.assertEqual(data["score"], 3)
        self.assertEqual(data["answeredCount"], 2)
        self.assertEqual(data["questionCount"], 2)
        self.assertNotIn("answer", data)
        self.assertNotIn("answers", data)
        self.assertNotIn("correctAnswer", data)

    def test_result_userid_parameter_cannot_expose_another_users_attempt(self):
        response = self.client.get(
            "/xinyu/examrecord/result",
            {"paperid": self.paper.id, "examno": "b-first", "userid": self.user_b.id},
            **self.auth_header(yonghu, self.user_a),
        )
        payload = self.payload(response)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(payload["code"], 403)

    def test_admin_can_view_selected_users_attempt_report(self):
        response = self.client.get(
            "/xinyu/examrecord/result",
            {"paperid": self.paper.id, "examno": "b-first", "userid": self.user_b.id},
            **self.auth_header(users, self.admin),
        )
        payload = self.payload(response)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(payload["code"], 0)
        self.assertEqual(payload["data"]["userid"], self.user_b.id)
        self.assertEqual(payload["data"]["examno"], "b-first")
        self.assertEqual(payload["data"]["score"], 4)


class Scl90WarningPushTests(TestCase):
    def setUp(self):
        self.user = yonghu.objects.create(
            id=1301,
            yonghuzhanghao="scl_user",
            mima="123456",
            yonghuxingming="SCL用户",
        )
        self.other_user_same_id = yonghu.objects.create(
            id=2301,
            yonghuzhanghao="same_id_user",
            mima="123456",
            yonghuxingming="同ID普通用户",
        )
        self.admin = users.objects.create(
            id=9301,
            username="scl_admin",
            password="123456",
            role="管理员",
        )
        self.doctor = xinliyisheng.objects.create(
            id=2301,
            yishenggonghao="scl_doc",
            mima="123456",
            yishengxingming="SCL医生",
        )
        self.paper = exampaper.objects.create(
            id=6401,
            name="SCL-90症状自评量表",
            time=0,
            status="启用",
            examnum=99,
        )
        self.questions = []
        options = json.dumps([
            {"code": "A", "text": "没有", "score": 1},
            {"code": "B", "text": "很轻", "score": 2},
            {"code": "C", "text": "中等", "score": 3},
            {"code": "D", "text": "偏重", "score": 4},
            {"code": "E", "text": "严重", "score": 5},
        ], ensure_ascii=False)
        for index in range(1, 91):
            question = examquestion.objects.create(
                id=640100 + index,
                paperid=self.paper.id,
                papername=self.paper.name,
                questionname="SCL-90第{}题".format(index),
                options=options,
                score=5,
                answer="",
                analysis="",
                type=0,
                sequence=91 - index,
            )
            self.questions.append(question)

    def auth_header(self, model, obj):
        login_column = getattr(model, "__loginUserColumn__", "username")
        data = {
            "id": obj.id,
            login_column: getattr(obj, login_column),
        }
        if hasattr(obj, "yonghuxingming"):
            data["yonghuxingming"] = obj.yonghuxingming
        if hasattr(obj, "yishengxingming"):
            data["yishengxingming"] = obj.yishengxingming
        return {"HTTP_TOKEN": Auth().get_token(model, data)}

    def payload(self, response):
        return json.loads(response.content.decode("utf-8"))

    def submit_scl90(self, examno, option_code):
        answers = {str(question.id): option_code for question in self.questions}
        return self.client.post(
            "/xinyu/examrecord/submit",
            data=json.dumps({
                "paperid": self.paper.id,
                "papername": self.paper.name,
                "examno": examno,
                "answers": answers,
            }),
            content_type="application/json",
            **self.auth_header(yonghu, self.user),
        )

    def message_titles(self, response):
        payload = self.payload(response)
        return [item["title"] for item in payload["data"]["list"]]

    def test_high_risk_scl90_submit_creates_warning_and_pushes_to_admin_and_doctor(self):
        response = self.submit_scl90("scl-high-1", "E")
        payload = self.payload(response)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(payload["code"], 0)
        self.assertTrue(payload["data"]["result"]["isPositive"])
        self.assertTrue(payload["data"]["warning"]["created"])
        self.assertEqual(payload["data"]["warning"]["recipientCount"], 2)
        self.assertEqual(jiankangyujing.objects.count(), 1)
        warning = jiankangyujing.objects.first()
        self.assertEqual(warning.yonghuzhanghao, "scl_user")
        self.assertIn("SCL-90测评预警", warning.yujingtixing)
        self.assertLessEqual(len(warning.yujingtixing), 200)
        self.assertLessEqual(len(warning.xinlijianyi), 200)
        self.assertEqual(popupremind.objects.filter(title="SCL-90测评预警").count(), 2)
        self.assertTrue(popupremind.objects.filter(userid=self.admin.id, role=self.admin.username).exists())
        self.assertTrue(popupremind.objects.filter(userid=self.doctor.id, role=self.doctor.yishenggonghao).exists())

    def test_low_risk_scl90_submit_does_not_create_warning(self):
        response = self.submit_scl90("scl-low-1", "A")
        payload = self.payload(response)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(payload["code"], 0)
        self.assertFalse(payload["data"]["result"]["isPositive"])
        self.assertFalse(payload["data"]["warning"]["created"])
        self.assertEqual(jiankangyujing.objects.count(), 0)
        self.assertEqual(popupremind.objects.filter(title="SCL-90测评预警").count(), 0)

    def test_repeated_same_examno_does_not_duplicate_warning(self):
        first = self.payload(self.submit_scl90("scl-high-repeat", "E"))
        second = self.payload(self.submit_scl90("scl-high-repeat", "E"))

        self.assertTrue(first["data"]["warning"]["created"])
        self.assertFalse(second["data"]["warning"]["created"])
        self.assertEqual(jiankangyujing.objects.count(), 1)
        self.assertEqual(popupremind.objects.filter(title="SCL-90测评预警").count(), 2)

    def test_warning_messages_are_visible_to_target_admin_and_doctor_only(self):
        self.submit_scl90("scl-high-visible", "E")

        admin_response = self.client.get(
            "/xinyu/popupremind/message/list",
            {"page": 1, "limit": 10, "sort": "id", "order": "asc"},
            **self.auth_header(users, self.admin),
        )
        doctor_response = self.client.get(
            "/xinyu/popupremind/message/list",
            {"page": 1, "limit": 10, "sort": "id", "order": "asc"},
            **self.auth_header(xinliyisheng, self.doctor),
        )
        user_response = self.client.get(
            "/xinyu/popupremind/message/list",
            {"page": 1, "limit": 10, "sort": "id", "order": "asc"},
            **self.auth_header(yonghu, self.other_user_same_id),
        )

        self.assertIn("SCL-90测评预警", self.message_titles(admin_response))
        self.assertIn("SCL-90测评预警", self.message_titles(doctor_response))
        self.assertNotIn("SCL-90测评预警", self.message_titles(user_response))
