import asyncio
import logging
from aiogram import Bot, Dispatcher, types
from aiogram.filters import Command
from aiogram.types import InlineKeyboardButton, WebAppInfo

# --- НАСТРОЙКИ ---
BOT_TOKEN = "9225552502:AAF__CS71fcOX2agQuoiCSeSF9dNJjryLJE" # Вставьте сюда ваш токен
WEB_APP_URL = "https://www.pravka.pro" # Вставьте сюда ссылку на ваш сайт

# --- КОД БОТА ---
logging.basicConfig(level=logging.INFO)
bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()

@dp.message(Command("start"))
async def cmd_start(message: types.Message):
    # Создаем кнопку, которая откроет Mini App
    web_app_info = WebAppInfo(url=WEB_APP_URL)
    button = InlineKeyboardButton(text="🚀 Открыть Тест", web_app=web_app_info)
    keyboard = types.InlineKeyboardMarkup(inline_keyboard=[[button]])

    await message.answer(
        text="Привет! Нажми на кнопку ниже, чтобы пройти тест:",
        reply_markup=keyboard
    )

async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())