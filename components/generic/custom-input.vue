<template lang="pug">
div.w-100
    .custom-input-wrapper.d-flex(:class="[theme, error ? 'error' : '', disabled ? 'disabled' : '']")
        .input-component-icon(v-if="icon" :style="{ backgroundImage: icon == 'password' ? 'url(/images/generic/password-icon.svg)' : icon == 'email' ? 'url(/images/generic/email-icon.svg)' : '' }")
        .custom-input.w-100
            input.input-component(
                :value="value"
                v-on:input="$emit('input', $event.target.value)"
                :type="type"
                :min="min"
                :inputmode="inputmode"
                required
                :autocomplete="autocomplete"
            )
            .input-component-label {{ title }}
                .is-required(v-if="isRequired")
    .error {{ error }} 
</template>

<script>
export default {
    props: {
        theme: {
            type: String
        },
        icon: {
            type: String,
            default: ''
        },
        value: {
            type: String
        },
        title: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: 'text'
        },
        error: {
            type: String,
            default: null
        },
        min: {
            type: Number,
            default: null
        },
        inputmode: {
            type: String,
            default: null
        },
        isRequired: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        autocomplete: {
            type: String,
            default: 'on'
        }
    }
}
</script>

<style lang="scss" scoped>
.custom-input-wrapper.disabled {
    position: relative;
    &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        display: block;
        width: 100%;
        height: 100%;
        background: rgba(130, 130, 130, 0.2);
        z-index: 1;
    }
}
.custom-input-wrapper {
    border: 1px solid #E3E3E3;
}
.custom-input-wrapper.error {
    border: 1px solid #F42E2E;
}
.custom-input-wrapper.dark {
    border: 1px solid #3A3A3A;
    .input-component {
        background: transparent;
        color: #fff;
        &:focus {
            outline: none;
            border: none;
        }
        &-label {
            background: transparent;
            color: #fff;
        }
    }
}
.input-component-icon {
    line-height: 1;
    border-right: 1px solid #E3E3E3;;
    box-sizing: border-box;
    border-radius: 0;
    padding: 15px 20px;
    max-height: 100%;
    min-width: 50px;
    background-repeat: no-repeat;
    background-position: center;
}
.error {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 150%;
    color: #F42E2E;
}

.input-component{
    position: relative;
    display: block;
    width: 100%;
    border: none;
    box-sizing: border-box;
    border-radius: 0;
    padding: 0 20px;
    padding-top: 25px;
    padding-bottom: 5px;
    font-family: "Roboto";
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 150%;
    color: #030303;
    transition: .2s;
    &:focus {
        outline: none;
    }
    &-label {
        pointer-events: none;
        display: flex;
        font-family: "Roboto";
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 150%;
        color: #767676;
        margin: 0;
        position: absolute;
        top: 15px;
        left: 15px;
        padding: 0 5px;
        transition: .3s;
    }
}
.is-required::after {
    content: '*';
    font-family: "Roboto";
    font-style: normal;
    font-weight: normal;
    line-height: 150%;
    color: #C40F0F;
    margin-left: 7px;
}
.input-component:focus~.input-component-label,
.input-component:not(:focus):valid~.input-component-label {
    top: 5px;
    font-size: 10px;
}
.custom-input {
    width: 100%;
    position: relative;
}
</style>