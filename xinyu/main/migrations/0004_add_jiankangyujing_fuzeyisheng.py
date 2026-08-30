# Generated manually: add responsible doctor fields to jiankangyujing
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_add_jiankangyujing_chulizhuangtai'),
    ]

    operations = [
        migrations.AddField(
            model_name='jiankangyujing',
            name='fuzeyishenggonghao',
            field=models.CharField(max_length=255, null=True, verbose_name='负责医生工号'),
        ),
        migrations.AddField(
            model_name='jiankangyujing',
            name='fuzeyishengxingming',
            field=models.CharField(max_length=255, null=True, verbose_name='负责医生姓名'),
        ),
    ]
