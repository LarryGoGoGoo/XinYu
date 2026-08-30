# Generated migration for TokenBlacklist model
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='TokenBlacklist',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('token_hash', models.CharField(db_index=True, max_length=64, unique=True, verbose_name='Token哈希')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='加入时间')),
                ('expires_at', models.DateTimeField(verbose_name='原始过期时间')),
            ],
            options={
                'verbose_name': 'Token黑名单',
                'verbose_name_plural': 'Token黑名单',
                'db_table': 'token_blacklist',
            },
        ),
    ]