<template>
    <div class="w-full bg-space">
        <div class="max-w-2xl px-50px py-12.5px mx-auto flex">
            <router-link to="/">
                <h1 class="text-white text-25px font-bold uppercase px-3 py-0.5 mr-4">jobly</h1>
            </router-link>
            <ul class="flex">
                <li>
                    <NuxtLink to="/applications">
                        <p
                          class="text-white opacity-50 px-3 py-2 hover:opacity-100 transition-all rounded-lg hover:bg-hoverbtn text-15px font-semibold">
                            Заявки</p>
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/newvacancy">
                        <p
                          class="text-white opacity-50 px-3 py-2 hover:opacity-100 transition-all rounded-lg hover:bg-hoverbtn text-15px font-semibold">
                            Вакансии</p>
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/candidates">
                        <p
                          class="text-white opacity-50 px-3 py-2 hover:opacity-100 transition-all rounded-lg hover:bg-hoverbtn text-15px font-semibold">
                            Кандидаты</p>
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/reports">
                        <p
                          class="text-white opacity-50 px-3 py-2 hover:opacity-100 transition-all rounded-lg hover:bg-hoverbtn text-15px font-semibold">
                            Отчеты</p>
                    </NuxtLink>
                </li>
            </ul>
            <ul class="flex ml-auto">
                <li class="mr-5px">
                    <div
                      class="w-10 h-10 rounded-plus flex items-center justify-center hover:bg-hoverbtn transition-all cursor-pointer">
                        <svg-icon name="pulse" width="20" height="20" />
                    </div>
                </li>
                <li class="mr-5px">
                    <div
                      class="w-10 h-10 rounded-plus flex items-center justify-center hover:bg-hoverbtn transition-all cursor-pointer">
                        <svg-icon name="calendar" width="20" height="20" />
                    </div>
                </li>
                <li class="mr-5px">
                    <div
                      class="w-10 h-10 rounded-plus flex items-center justify-center hover:bg-hoverbtn transition-all cursor-pointer">
                        <svg-icon name="bell" width="20" height="20" />
                    </div>
                </li>
                <li class="mr-5">
                    <div
                      class="w-10 h-10 rounded-plus flex items-center justify-center hover:bg-hoverbtn transition-all cursor-pointer">
                        <svg-icon name="settings" width="20" height="20" />
                    </div>
                </li>
                <li>
                    <div class="cursor-pointer">
                        <UiAvatar>
                            <UiAvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
                            <UiAvatarFallback>ДМ</UiAvatarFallback>
                        </UiAvatar>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>