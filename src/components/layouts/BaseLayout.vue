<script setup lang="ts">
import styled from 'vue3-styled-components';

const Layout = styled.div`
  background: ${({ theme }) => theme.colors.Secondary9};
  min-height: 100vh;
`;

const HeaderArea = styled.div``;

const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 414px;
  width: 100%;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.Secondary0};
`;

const FooterArea = styled.div``;
</script>

<template>
  <Layout>
    <HeaderArea>
      <slot name="header" />
    </HeaderArea>

    <ContentArea>
      <slot />
    </ContentArea>

    <FooterArea>
      <slot name="footer" />
    </FooterArea>
  </Layout>
</template>
